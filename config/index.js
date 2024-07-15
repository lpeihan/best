'use strict';

const { merge } = require('webpack-merge');

const mode = process.env.MODE || 'dev';

module.exports = merge(
  {
    outputDir: 'dist',
    port: 7070,
  },
  require(`./${mode}.env.js`),
);
