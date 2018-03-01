
const config = require('./webpack.base.config')
const proxy = require('http-proxy-middleware')
//var Dashboard = require('webpack-dashboard');
//var DashboardPlugin = require('webpack-dashboard/plugin');
//var dashboard = new Dashboard();

//var pathout = "/build/dev";

//config.output.path = __dirname + pathout;
//config.devServer.contentBase = pathout;
//config.plugins.push(new DashboardPlugin(dashboard.setData));

var devServer = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 8081,
    host: 'localhost',
    proxy: {
        '/backend/*': {
            target: 'http://localhost:8080/',
            changeOrigin: true,
            secure: false
        }
    }
};

config.devtool = 'eval-source-map';
config.devServer = devServer;

module.exports = config;

