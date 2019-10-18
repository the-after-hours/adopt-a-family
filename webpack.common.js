const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const PUBLIC_PATH = path.resolve(__dirname, '/');

function resolveModule(name = '') {
  return path.resolve(__dirname, 'src', 'js', name);
}

const include = [resolveModule()];
const config = {
  entry: resolveModule('main.tsx'),
  module: {
    rules: [
      {
        include,
        loader: 'awesome-typescript-loader',
        resolve: {
          alias: {
            components: resolveModule('components'),
            types: resolveModule('types'),
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        test: /\.(js|ts)x?$/,
      },
      {
        include: path.resolve(__dirname, 'src', 'css'),
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('autoprefixer')()],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: PUBLIC_PATH,
  },
  plugins: [
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Adopt a Family',
    }),
  ],
  target: 'web',
};

module.exports = {
  config,
  include,
  publicPath: PUBLIC_PATH,
};
