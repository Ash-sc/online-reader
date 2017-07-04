/**
 * Created by ash on 11/05/2017.
 */
var path = require('path');
var webpack = require('webpack');
var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PROJECT_ROOT = path.normalize(`${__dirname}/../..`);
const SRC = `${PROJECT_ROOT}/src`;

module.exports = {
  context: path.join(__dirname, `${SRC}`),
  entry: ['babel-polyfill', `${SRC}/js/index.jsx`],
  devtool: 'source-map',
  watchOptions: { poll: true },
  output: {
    filename: 'bundle.js',
    chunkFilename: '[id].[name].chunk.js',
    publicPath: '/', //dev. bundle.js is served in memory
    path: __dirname + '/public/',  // local, when really generate a visible bundle.js inside build
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
        loader:'file-loader?name=images/[name].[ext]',
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
        loader: 'happypack/loader?id=happybabel',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint-loader'],
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
    new ExtractTextPlugin('styles.css', {allChunks: true}),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'APP_DOMAIN': JSON.stringify(process.env.APP_DOMAIN),
        'ENVIRONMENT': JSON.stringify(process.env.ENVIRONMENT || 'local'),
        'NODE_ENV': JSON.stringify(process.env.ENVIRONMENT || 'local'),
      }
    }),
    new HappyPack({
      id: 'happybabel',
      loaders: ['jsx?harmony', 'babel', 'eslint-loader'],
      threadPool: happyThreadPool,
      verbose: true
    }),
  ]
};
