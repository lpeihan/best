const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const Table = require('cli-table3');
const ora = require('ora');
const tinify = require('tinify');

const spinner = ora('tiny files, please wait...');

tinify.key = 'mmC5j9RdFfKKQvGphrfRvkhSjf6wwJVS';

function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  return ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(ext);
}

function bytesToKiB(bytes) {
  return (bytes / 1024).toFixed(2);
}

function traverseDirectory(dir, files) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const filePath = path.join(dir, item);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      traverseDirectory(filePath, files);
    } else if (stats.isFile()) {
      if (isImageFile(filePath)) {
        files.push({
          size: bytesToKiB(fs.statSync(filePath).size),
          filePath,
          relativePath: filePath.split('src/')[1],
        });
      }
    }
  });
}

async function start() {
  try {
    const files = [];
    traverseDirectory(path.join(__dirname, '../src'), files);

    const table = new Table({
      head: ['Filename', 'Original Size', 'Compressed Size'],
      colWidths: [45, 20, 20],
    });

    spinner.start();
    for (const item of files.sort((a, b) => b.size - a.size)) {
      const shouldCompress = item.size >= 100;

      if (process.argv[2] === 'compress' && shouldCompress) {
        await tinify.fromFile(item.filePath).toFile(item.filePath);
      }

      const compressedSize = bytesToKiB(fs.statSync(item.filePath).size);

      table.push([
        shouldCompress ? chalk.cyanBright(item.relativePath) : chalk.blue(item.relativePath),
        chalk.green(item.size + ' Kib'),
        chalk.green(compressedSize + ' Kib'),
      ]);
    }
    spinner.stop();

    console.log(table.toString());
  } catch (err) {
    console.log(err);
  }
}

start();
