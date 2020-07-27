const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const prodWebpackConfig  = webpackMerge(baseWebpackConfig, {
	mode: 'production',
	optimization: {
		splitChunks: { //代码分割
			chunks: 'all',
			minSize: 10000,
			minChunks: 1,
			maxAsyncRequests: 5,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					priority: -20,
					reuseExistingChunk: true,
					minChunks: 1,
				}
			}
		},
		minimizer: [
			new OptimizeCssAssetsPlugin({ //css压缩
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {
					safe: true,
					autoprefixer: {
						disable: true
					},
					mergeLonghand: false,
					discardComments: {
						removeAll: true // 移除注释
					}
				},
				canPrint: true
			}),
			new TerserPlugin({
				exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，
				cache: true,
				parallel: true, // 开启并行压缩，充分利用cpu
				sourceMap: false,
				extractComments: true, // 移除注释
				terserOptions: {
					compress: {
						unused: true,
						warnings: false,
						drop_console: true,
						drop_debugger: true
					},
					output: {
						comments: false
					}
				}
			})
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
	]
})

module.exports = prodWebpackConfig
