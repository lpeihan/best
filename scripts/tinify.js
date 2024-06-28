const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const ui = require('cliui')({ width: process.stdout.columns || 80 });
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

function makeRow(a, b, c) {
  return `  ${a}\t    ${b}\t ${c}`;
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

    spinner.start();
    let str =
      makeRow(
        chalk.cyan.bold(`Filename`),
        chalk.cyan.bold(`Original Size`),
        chalk.cyan.bold(`Compressed Size`),
      ) + `\n\n`;
    for (const item of files.sort((a, b) => b.size - a.size)) {
      const shouldCompress = item.size >= 100;

      if (process.argv[2] === 'compress' && shouldCompress) {
        await tinify.fromFile(item.filePath).toFile(item.filePath);
      }

      const compressedSize = bytesToKiB(fs.statSync(item.filePath).size);

      str +=
        makeRow(
          shouldCompress ? chalk.cyanBright(item.relativePath) : chalk.blue(item.relativePath),
          chalk.green(item.size + ' Kib'),
          chalk.green(compressedSize + ' Kib'),
        ) + '\n';
    }
    spinner.stop();

    ui.div(str);
    console.log(ui.toString());
  } catch (err) {
    console.log(err);
  }
}

start();
