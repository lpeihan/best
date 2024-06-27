'use strict';

const ProgressPlugin = require('progress-webpack-plugin');
const { merge } = require('webpack-merge');

const config = require('./config');
const cssConf = require('./css.conf');
const webpackBaseConf = require('./webpack.base.conf');

module.exports = merge(webpackBaseConf, cssConf, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    open: true,
    host: '0.0.0.0',
    port: config.port,
    liveReload: false,
  },

  infrastructureLogging: {
    level: 'warn',
  },

  stats: {
    assets: false,
    modules: false,
  },

  plugins: [new ProgressPlugin(true)],
});
