'use strict';

const { merge } = require('webpack-merge');

const mode = process.env.MODE || 'dev';
const envConfig = require(`./${mode}.env.js`);

module.exports = merge(
  {
    outputDir: 'dist',
    port: 7070,
  },
  envConfig,
);
