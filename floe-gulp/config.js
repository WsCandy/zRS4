var resourcesBasePath = process.env.PWD+'/httpdocs/assets',
    react = `${process.env.PWD}/floe/app/react`,
	viewsBasePath = process.env.PWD+'/floe/app/views',
    gutil = require('gulp-util');

module.exports = {
	
	views: viewsBasePath,
	assets: resourcesBasePath,
    react: react,

    sass: {

		src: resourcesBasePath + '/sass/*.scss',
        dest: resourcesBasePath + '/css'

    },
    
    img: {
      
        src: resourcesBasePath + '/img/**/*',
        dest: resourcesBasePath + '/img'
        
    },
    
    svg: {
      
        src: resourcesBasePath + '/svg/**/*',
        dest: resourcesBasePath + '/svg'
        
    },

    watch: {

		sass: resourcesBasePath + '/sass/**/*.scss',
		scripts: [`${react}/**/*.js`],
        views: viewsBasePath + '/**/*.html'

    }

};