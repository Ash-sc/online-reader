/**
 * Created by ash on 11/05/2017.
 */
var path = require('path');
var webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PROJECT_ROOT = path.normalize(`${__dirname}/../..`);
const SRC = `${PROJECT_ROOT}/src`;

module.exports = {
  context: path.join(__dirname, `${SRC}`),
  entry: ['babel-polyfill', `${SRC}/js/index.jsx`],
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    chunkFilename: '[id].[name].chunk.js',
    publicPath: '/',
    path: 'public/', // for deployment
  },
  externals: {
    "moment": 'moment',
    "lodash": '_',
  },
  module: {
    loaders: [{
      test: /\.(css|scss)$/,
      loader: ExtractTextPlugin.extract(['css', 'sass']),
    },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loaders:['file-loader?name=images/[name].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&quality=95&interlaced=false'],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        exclude: /node_modules/,
      },
      {
        test: /\.ico$/,
        loader:'file-loader?name=[name].ico',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loaders: ['jsx?harmony', 'babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: "json-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/,
      }]
  },
  resolve: {
    root: [path.resolve(__dirname, `${SRC}`), path.resolve(__dirname, 'node_modules')],
    alias: {
      components: 'js/components',
      constants: 'js/constants',
      utils: 'js/utils',
    },
    extensions: ['', '.js', '.jsx', '.png']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('styles.css', {allChunks: true}),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'APP_DOMAIN': JSON.stringify(process.env.APP_DOMAIN),
        'ENVIRONMENT': JSON.stringify('production'),
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
  ]
};
