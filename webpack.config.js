const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: ['last 2 version', 'ie >= 11'],
                },
              }],
            ],
          },
        }],
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new CleanWebpackPlugin(['build/*.*'], {root: __dirname}),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public', 'index.html'), 
        to: path.resolve(__dirname, 'build', 'index.html'),
      },
      {
        from: path.resolve(__dirname, 'public', 'style.css'),
        to: path.resolve(__dirname, 'build', 'style.css'),
      },
      {
        from: path.resolve(__dirname, 'public', 'bundle.js'),
        to: path.resolve(__dirname, 'build', 'bunle.js'),
      },
    ]),
  ],
};