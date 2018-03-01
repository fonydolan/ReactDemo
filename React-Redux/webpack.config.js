var path = require('path');

module.exports = {
  entry:
  {
    javascript: path.join(__dirname, './app/main.js'),
  },
  output: {
    path: path.join(__dirname, './view/js'),
    filename: 'bundle.js',
    // 添加 chunkFilename
    chunkFilename: '[name].[chunkhash:5].chunk.js',
  },
  module: {
    loaders: [
     {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets: ['react', 'es2015']}  
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets: ['react', 'es2015']}  
      },
      {
        test: /\.html$/,
        //exclude: /view/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }
    ]
  }
};