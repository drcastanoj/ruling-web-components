
const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = merge(common, {
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".scss"]
  },
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
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
        use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader'],
        exclude:  helpers.root('src', 'components'),
      }
    ]
  }
});
