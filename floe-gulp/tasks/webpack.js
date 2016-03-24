var gulp = require('gulp'),
	gutil = require('gulp-util'),
	webpack = require("webpack");

exports.init = function(config) {

	console.log(process.env.PWD);

	webpack({

		watch: (process.env.NODE_ENV === 'production' ? false : true),
		entry: `${config.assets}/js/src/main.js`,
		output: {

			path: `${config.assets}/js`,
			filename: 'main.min.js'

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
			//new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.DefinePlugin({

				'process.env': {

					'NODE_ENV': JSON.stringify('developement')

				}

			})
		]

	}, function(err, stats) {

		if(err) throw new gutil.PluginError("webpack", err);

		gutil.log("[webpack]", stats.toString({
			// output options
		}));

		gutil.log(gutil.colors.green('Webpack Compile Complete!'));

	});

};

exports.default = true;