const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common.config, {
  mode: 'production',
  output: {
    chunkFilename: '[id].[chunkhash].js',
  },
  performance: {
    hints: false,
  },
});
