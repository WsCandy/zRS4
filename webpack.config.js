const path = require('path');
const webpack = require('webpack');

module.exports = {

	watch: true,
	entry: {
		'zRS': `./src/index.js`,
		'zRS.min':`./src/index.js`
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'stage-0']
				},
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.js$/,
			beautify: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		})
	]
};