'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var debug = process.env.NODE_ENV !== 'production';

module.exports = [{
  name: 'js',
  entry: {
    vendor_axios_core: ['axios'],
    vendor_history_core: ['history'],
    vendor_react_core: ['react'],
    vendor_redux_core: ['redux'],    
    vendor_react_addon: ['react-bootstrap', 'react-dom', 'react-redux', 'react-router'],
    vendor_redux_addon: ['redux-logger', 'redux-thunk'],
    client: './jsx/client.jsx'
  },
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : '',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /^(node_modules|bower_components|js|css)$/,
      loader: 'babel-loader',
      options: {
        presets: [
          'react',
          'es2015'
        ],
        plugins: [
          'react-html-attrs', 
          'transform-decorators-legacy', 
          'transform-class-properties'
        ]
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname,
    filename: './js/[name].min.js'
  },
  plugins: [
    new CommonsChunkPlugin({
      name: [
        'client',
        'vendor_redux_addon', 
        'vendor_react_addon',         
        'vendor_redux_core',          
        'vendor_react_core', 
        'vendor_history_core', 
        'vendor_axios_core'
        ],
      minChunks: Infinity
    })
  ].concat(debug ? [] : [
    new UglifyJsPlugin({
      mangle: true
    })
  ])
}, {
  name: 'css',
  entry: './scss/client.styles.scss',
  context: __dirname,  
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /^(node_modules|bower_components|js|css)$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'sass-loader'
        ]
      })    
    }, { 
      test: /\.svg$/, 
      use: ['url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]']
    }, { 
      test: /\.woff$/, 
      use: ['url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]']
    }, { 
      test: /\.woff2$/, 
      use: ['url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]'] 
    }, { 
      test: /\.[ot]tf$/, 
      use: ['url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]'] 
    }, { 
      test: /\.eot$/, 
      use: ['url-loader?limit=65000&mimetyp]']
    }, {
      test: /\.png$/,
      use: ['url-loader?limit=65000&mimetype=image/png&name=images/[name].[ext]']
    }, {
      test: /\.gif$/,
      use: ['url-loader?limit=65000&mimetype=image/gif&name=images/[name].[ext]']
    }]
  },
  output: {
    path: __dirname,
    filename: './css/client.temp.js',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './css/client.min.css', 
      allChunks: true 
    })
  ].concat(debug ? [] : [
    new UglifyJsPlugin({
      mangle: true
    }),
  ])
}];