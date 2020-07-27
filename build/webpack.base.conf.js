const webpack = require('webpack');
const {
	resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
	VueLoaderPlugin
} = require("vue-loader");
const srcPath = resolve(__dirname, '..', 'src');
const isProd = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
	context:srcPath,
	stats: { //控制台统计信息
	    assets: true,
	    builtAt: true,
	    colors: true,
	    chunks: false,
	    children: false,
	    env: true,
	    entrypoints: false,
	    errors: true,
	    errorDetails: true,
	    hash: true,
	    modules: false, // 构建模块信息
	    moduleTrace: true,
	    performance: true,
	    publicPath: true,
	    timings: true,
	    version: true,
	    warnings: false,
	},
	entry: {
		app: "./main.ts",
	},
	output: {
		path: resolve(__dirname, '..', 'dist'),
		filename: 'static/js/[hash:8].js',
	},
	resolve: {
		modules: [srcPath, 'node_modules'], //解析模块时应该搜索的目录
		extensions: ['.js', '.ts', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': srcPath
		}
	},
	devtool: isProd ? false : 'cheap-module-eval-source-map',
	module: {
		rules: [
			{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
					options: {
						appendTsSuffixTo: [/\.vue$/],
					}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					!isProd ? 'style-loader' :
					MiniCssExtractPlugin.loader,
					"css-loader"
				]
			},
			{
				test: /\.less$/,
				use: [
					!isProd ? 'style-loader' :
					MiniCssExtractPlugin.loader,
					"css-loader",
					"less-loader"
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/fonts/[name].[hash:7].[ext]'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'base template',
			filename: 'index.html',
			template: resolve(__dirname, '../public/index.html'),
			hash: true, //给生成的 js 文件一个独特的 hash 值
			minify: { // 压缩HTML文件
				removeRedundantAttributes: true, //删除多余的属性
				collapseWhitespace: true, // 删除空白符与换行符
				removeComments: true, //移除HTML中的注释
				removeAttributeQuotes: true //是否移除属性的引号
			},
			favicon: resolve(__dirname, '../public/favicon.ico') //给生成的html文件生成一个favicon
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[chunkhash:8].css",
			chunkFilename: 'static/css/[id].[hash:8].css',
			
		}),
		new VueLoaderPlugin(),
	]
}