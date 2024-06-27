'use strict';

const { rimraf } = require('rimraf');
const webpack = require('webpack');

process.env.NODE_ENV = 'production';

const { error, done } = require('./utils/logger');
const { logWithSpinner, stopSpinner } = require('./utils/spinner');
const paths = require('./utils/paths');
const formatStats = require('./utils/formatStats');

const webpackProdConf = require('./webpack.prod.conf');

logWithSpinner('Building for production...\n');

rimraf(paths.resolve('dist')).then(() => {
  webpack(webpackProdConf, (err, stats) => {
    stopSpinner(false);

    if (err) throw err;

    if (stats.hasErrors()) {
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        }) + '\n\n',
      );

      error('Build failed with errors.\n');
      process.exit(1);
    }

    console.log(formatStats(stats, 'dist'));

    done('Build complete.\n');
  });
});
