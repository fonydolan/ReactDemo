var path = require('path');

module.exports = {
  entry:
  {
    javascript: path.join(__dirname, './app/main.js'),
    //html: path.resolve(__dirname, './view/index.html')
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
      /*
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=es2015,presets[]=react']//,presets[]=stage-0,plugins[]=transform-runtime 'react-hot', 
      },
      */
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