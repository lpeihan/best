'use strict';

const { rimraf } = require('rimraf');
const webpack = require('webpack');

const { error, done } = require('./utils/logger');
const { logWithSpinner, stopSpinner } = require('./utils/spinner');
const paths = require('./utils/paths');
const formatStats = require('./utils/formatStats');

const webpackProdConf = require('./webpack.prod');

logWithSpinner('Building for production...\n');

rimraf(paths.resolve('dist')).then(() => {
  webpack(webpackProdConf, (err, stats) => {
    stopSpinner(false);

    if (err) throw err;

    if (stats.hasErrors()) {
      error('Build failed with errors.\n');
      process.exit(1);
    }

    console.log(formatStats(stats, 'dist'));

    done('Build complete.\n');
  });
});
