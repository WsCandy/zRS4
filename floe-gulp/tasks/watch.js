var gulp = require('gulp');

exports.init = function(config) {

	if(process.env.NODE_ENV !== 'production') {

		gulp.watch(config.watch.sass, function() {

			var sass = require('./sass').init(config);

		});

	}

}

exports.default = true;