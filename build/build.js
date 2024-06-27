'use strict';

const { rimraf } = require('rimraf');
const webpack = require('webpack');

const config = require('./config');
const formatStats = require('./utils/formatStats');
const { error, done } = require('./utils/logger');
const paths = require('./utils/paths');
const { logWithSpinner, stopSpinner } = require('./utils/spinner');
const webpackProdConf = require('./webpack.prod.conf');

logWithSpinner('Building for production...\n');

rimraf(paths.resolve(config.outputDir)).then(() => {
  webpack(webpackProdConf, (err, stats) => {
    stopSpinner(false);

    if (err) throw err;

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n',
    );

    if (stats.hasErrors()) {
      error('Build failed with errors.\n');
      process.exit(1);
    }

    console.log(formatStats(stats, config.outputDir));

    done('Build complete.\n');
  });
});
