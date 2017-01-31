const path = require('path');
const webpack = require('webpack');

module.exports = {

	watch: true,
	entry: `./index.js`,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'zRS.min.js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};