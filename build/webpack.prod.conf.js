const { merge } = require('webpack-merge');
const webpackBaseConf = require('./webpack.base.conf');
const cssConf = require('./css.conf');

module.exports = merge(webpackBaseConf, cssConf, {
  mode: 'production',
});
