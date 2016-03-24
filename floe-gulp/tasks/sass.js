var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    fs = require('fs');

var positive = ['Good Job', 'Astounding', 'Bewildering', 'Breathtaking', 'Extraordinary', 'Impressive', 'Marvelous', 'Miraculous', 'Spectacular', 'Staggering', 'Startling', 'Striking', 'Stunning', 'Stupefying', 'Stupendous', 'Wonderful', 'Wondrous', 'Amazing', 'Awesome', 'Incredible', 'Prodigious', 'Stunning', 'Fascinating', 'Marvelous', 'Shocking', 'Surprising', 'Unbelievable', 'Wonderful', 'C-C-C-C-Combo Breaker', 'Dominating', 'Unstopable', 'Finish Him', 'It\'sa me, Mario'];
var negative = ['Tosser', 'Wanker', 'Slag', 'Daft Cow', 'Arsehole', 'Barmy', 'Chav', 'Dodgy', 'Git', 'Gormless', 'Manky', 'Minger', 'Muppet', 'Naff', 'Nutter', 'Pikey', 'Pillock', 'Plonker', 'Prat', 'Scrubber', 'Trollop', 'Twit', 'Knob', 'Wazzock', 'Ninny', 'Berk', 'Airy-fairy', 'Ankle-biters', 'Arse-licker', 'Arsemonger', 'Chuffer', 'Gannet', 'Maggot', 'Mingebag'];

exports.init = function(config) {
    
    fs.unlink(config.assets+'/css/main.css', function(err){});
    
    gutil.log(gutil.colors.yellow('Writing CSS to '+config.sass.dest+' and generating a CSS map...'));
    
	gulp.src(config.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass({
		
			includePaths : [config.sass.dest+'/'],

		}).on('end', function() {
                
            var congrats = Math.floor((Math.random() * positive.length));
        
			gutil.log(gutil.colors.green('SASS successfully written! '+positive[congrats]+'!'));

		})
		.on('error', function(err) {
        
			var filePath = err.file.split('/'),
                fail = Math.floor((Math.random() * negative.length));

			gutil.log(gutil.colors.red(err.file))
			gutil.log(gutil.colors.red('Line: ' + err.line, 'Col: ' + err.column + ' - ' + err.message))
			gutil.log(gutil.colors.red('SASS not compiled...! Well done you '+negative[fail]+'!'))

		}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest(config.sass.dest+'/'))
		.on('error', gutil.log);
        
}

exports.default = true;
