import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { OccurenceOrderPlugin, includePaths, excludePaths } from './utils';

const config = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    manager: [require.resolve('../../manager')],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        query: require('./babel.js'), // eslint-disable-line
        include: includePaths,
        exclude: excludePaths,
      },
    ],
  },
  resolve: {
    alias: {
      react$: require.resolve('react'),
      'react-dom$': require.resolve('react-dom'),
      'react-native$': require.resolve('react-native'),
    },
  },
};

export default config;
