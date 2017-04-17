module.exports = {
  context: __dirname,
  entry: "./main.js",
  output: {
    path: "./static/",
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
    extensions: [".js", ".jsx"]
  }
};
