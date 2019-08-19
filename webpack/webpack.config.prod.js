const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BASE_URL': JSON.stringify('api/')

    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/i,
        use: ['raw-loader']
      },
      {
        test: /\.s?css$/i,
        include: helpers.root('src', 'components'),
        loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
      },
      // all sass imports in ts without angular components 
      {
        test: /\.s?css$/i,
        use: [ 'style-loader', 'css-loader', 'sass-loader'],
        exclude:  helpers.root('src', 'components'),
      }
    ]
  }
});
