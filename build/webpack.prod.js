const { merge } = require('webpack-merge');
const webpackBaseConf = require('./webpack.base');
const webpackCSSConf = require('./webpack.css');

module.exports = merge(webpackBaseConf, webpackCSSConf, {
  mode: 'production',
});
