const paths = require('./utils/paths');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';
const outputFileName = `js/[name]${isProd ? '.[contenthash:8]' : ''}.js`;

module.exports = {
  context: process.cwd(),

  entry: {
    app: './src/main.js',
  },

  output: {
    path: paths.resolve('dist'),
    publicPath: 'public',
    filename: outputFileName,
    chunkFilename: outputFileName,
  },

  resolve: {
    alias: {
      '@': paths.resolve('src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.m?jsx?$/,
        exclude: (file) => {
          // always transpile js in vue files
          if (/\.vue\.jsx?$/.test(file)) {
            return false;
          }
          // Don't transpile node_modules
          return /node_modules/.test(file);
        },
        use: ['thread-loader', 'babel-loader'],
      },
    ],
  },

  plugins: [new VueLoaderPlugin()],
};
