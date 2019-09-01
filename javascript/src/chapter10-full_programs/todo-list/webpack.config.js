const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = [{
  cache: true,
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    filename: './dist/js/build.js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true}
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: '../public/index.html',
      // filename: 'index.html'
    })
  ]
}];
