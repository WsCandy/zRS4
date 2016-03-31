var gulp = require('gulp'),
	gutil = require('gulp-util'),
	webpack = require("webpack");

gulp.task('default', function() {

	webpack({

		watch: true,
		entry: `${process.env.PWD}/js/src/zRS.js`,
		output: {

			path: `${process.env.PWD}/js/`,
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
			new webpack.NoErrorsPlugin(),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.DefinePlugin({
				'process.env': {

					'NODE_ENV': JSON.stringify('production'),
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

});