const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');
const WebpackBar = require('webpackbar');

const webpackDevConfig = merge(webpackBaseConfig,{
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
	    clientLogLevel: 'warning',
	    historyApiFallback: true,
	    hot: true,
	    contentBase: false, // since we use CopyWebpackPlugin.
	    compress: true,
	    host: 'localhost',
	    port: '8099',
	    open: true,
	    overlay: { warnings: false, errors: true },//在浏览器上全屏显示编译的errors或warnings
	    publicPath: '/',
	    proxy: {
		  '/test': {
			target: 'http://111.16.3.185', 
			changeOrigin: true,  //是否跨域
			headers: {
			  'token': '2222'
			}
		   }
		},
	    quiet: false, // necessary for FriendlyErrorsPlugin
	},
	plugins: [
		new WebpackBar(),
		new webpack.HotModuleReplacementPlugin(),
	]
})
module.exports = webpackDevConfig