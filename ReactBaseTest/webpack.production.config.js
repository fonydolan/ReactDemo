
const config = require('./webpack.base.config')

//var pathout = "/build/prd";
//config.output.path = __dirname + pathout;
//config.devServer.contentBase = pathout;

config.devtool = false;//"cheap-module-source-map";

module.exports = config;