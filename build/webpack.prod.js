const { merge } = require('webpack-merge');
const webpackBaseConf = require('./webpack.base');

module.exports = merge(webpackBaseConf, {
  mode: 'production',
});
