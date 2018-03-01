const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const path = require("path")
const glob = require('glob')

//去除build文件中的残余文件
var outDirClean = "build";
var outDir = "/"+outDirClean; //'/build'

var srcDir = "/src"
//entries函数
var entryFilesGet = function () {
    var jsDir = path.resolve(__dirname + srcDir)
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    var files = [];

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        files.push({ 'name': filename, 'path': filePath });
    }
    return files;
}

var files = entryFilesGet();
var htmlplugins = [];
var entriesMap = {}//入口文件
files.forEach((item) => {
    //test filte
    if (item.name.indexOf('test') >= 0) {
        return;
    }
    entriesMap[item.name] = item.path;
    var chunksValue = ['common'];
    if (item.name == 'main') {
        chunksValue.push('gojs');
    }
    chunksValue.push(item.name);
    var hp = new HtmlWebpackPlugin({
        title: item.name,
        filename: __dirname + outDir + '/' + item.name + '.html',
        template: __dirname + "/src/template/index.html",
        verbose: true,
        inject: true,//'body'
        hash: true,
        chunks: chunksValue,//chunks这个参数告诉插件要引用entry里面的哪几个入口 
        chunksSortMode: 'dependency'
    });
    htmlplugins.push(hp);
});
console.log('entriesMap common js');
//common js
entriesMap = Object.assign(entriesMap, {
    // 公共lib，目的是将公用库单独提取打包
    'common': ['react', 'react-dom', 'antd'],
    'gojs': ['gojs']
});
console.log('entriesMap htmlplugins end');
var plugins = [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.UglifyJsPlugin(),//压缩JS代码；
    new ExtractTextPlugin({
        filename: './styles/[name].[hash].css',
        allChunks: true
    }),//分离CSS和JS文件
    new CleanWebpackPlugin([outDirClean + '/*/*.*', outDirClean + '/*.*'], {
        root: __dirname,
        verbose: true,
        dry: false
    }),
    new CommonsChunkPlugin({
        name: 'common', // 上面入口定义的节点组
        filename: '[name].js', //最后生成的文件名
        minChunks: Infinity,// (随着 entry chunk 越来越多， 这个配置保证没其它的模块会打包进 common chunk)
    }),
    new CommonsChunkPlugin({
        name: 'gojs', // 上面入口定义的节点组
        filename: '[name].js', //最后生成的文件名
        //minChunks: Infinity,
        chunks: ['main']
    }),
];
htmlplugins.forEach((item) => {
    plugins.push(item);
});
console.log('plugins end');

console.log('webpackConfig start');

var webpackConfig = {
    entry: entriesMap
    //{
    //'main': __dirname + "/src/main.js",
    //'test': [__dirname + "/src/test.js", __dirname + "/src/testantd.js"]
    //}
    ,
    output: {
        path: path.join(__dirname, outDir),//打包后的文件存放的地方
        filename: "build.[name].[hash].js",//打包后输出文件的文件名 [name]
        chunkFilename: "chunk.[id].[hash].js"
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            'es2015',"env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader']
                    }
                )
            }
        ]
    },
    plugins: plugins
};
module.exports = webpackConfig;


  //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
 /** 
  devtool: 
  source-map	在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
  cheap-module-source-map	在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
  eval-source-map	使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
  cheap-module-eval-source-map	这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；
  
    devserver的配置选项	功能描述
    contentBase	默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“build"目录）
    port	设置默认监听端口，如果省略，默认为”8080“
    inline	设置为true，当源文件改变时会自动刷新页面
    historyApiFallback	在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
   */
