const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common.config, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 3000,
    proxy: {
      '**': 'http://0.0.0.0:5000',
    },
    publicPath: common.publicPath,
  },
  devtool: 'inline-source-map',
  output: {
    chunkFilename: '[name].[chunkhash:8].js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
