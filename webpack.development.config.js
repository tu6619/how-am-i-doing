
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './frontend/src/js/index'
  ],
  output: {
      path: path.join(__dirname, 'dist'), // what does this do?
      filename: 'bundle.js',
      publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'frontend')
    }, {
      test: /\.scss$/,
      // exclude: path.resolve(__dirname, 'node_modules'),
      include: path.join(__dirname, 'frontend'),
      loader: 'style-loader!css-loader!sass-loader'
    }]
  }
};
