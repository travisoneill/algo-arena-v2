<<<<<<< 0878c32808925c0dd67a7d6cafeb570015044ba5
<<<<<<< 01ab4c70a857e1f04984c617830525cbe67559b3
module.exports = {
  context: __dirname,
  entry: "./redux_main.jsx",
=======
const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './'),
  entry: {
    js: './main.jsx',
  },
>>>>>>> optimize bundle.js
=======
module.exports = {
  context: __dirname,
  entry: "./main.jsx",
>>>>>>> rearange modals
  output: {
    path: "./assets/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  stats: {
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: true
          },
  devtool: 'source-maps',

  resolve: {
<<<<<<< 0878c32808925c0dd67a7d6cafeb570015044ba5
<<<<<<< 01ab4c70a857e1f04984c617830525cbe67559b3
    extensions: ["", ".js", ".jsx"]
=======
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ],
  devServer: {
    contentBase: './client'
    // hot: true
>>>>>>> optimize bundle.js
  }
=======
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-map',
>>>>>>> rearange modals
};
