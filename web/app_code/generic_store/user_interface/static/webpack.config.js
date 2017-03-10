'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var debug = process.env.NODE_ENV !== 'production';

module.exports = [{
  name: 'js',
  entry: "./jsx/client.jsx",
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : "",
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
        ],
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname,
    filename: "./js/client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.UglifyJsPlugin({ 
      mangle: false, 
      sourcemap: false, 
      compress: {
        warnings: true
      } 
    }),
  ]
}, {
  name: 'css',
  entry: './scss/client.scss',
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
      }),
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
    }]
  },
  output: {
    path: __dirname,
    filename: './scss/client.temp.js'
  },
  plugins: [new ExtractTextPlugin({filename: './css/client.min.css', allChunks: true })] 
}];