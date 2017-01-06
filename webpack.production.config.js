const path = require('path');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

//Path for the bundle:
const BUILD_DIR = path.resolve(__dirname,'src/client/public');
//Path for all jsx files:
const APP_DIR = path.resolve(__dirname,'src/client/app');

module.exports = {
  devtool: 'source-map',
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src/client')),
  ],
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      // include: APP_DIR,
      exclude: path.resolve(__dirname,'node_modules/'),
      query: {
        presets: ['es2015', 'react', 'stage-2']
      }
    }]
  },
};