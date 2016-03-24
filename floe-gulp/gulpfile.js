var fs = require('fs'),
    Q = require('q'),
    modules = fs.readdirSync('./floe-gulp/tasks'),
    gutil = require('gulp-util'),
    tasks = {};

try {
    
    var customTasks = fs.readdirSync(process.env.PWD+'/floe-gulp/tasks');
    
} catch(err) {};

exports.init = function(gulp) {
        
    try {
        
        var config = require(process.env.PWD+'/config');
        gutil.log(gutil.colors.red('Using Custom Config...'));
        
    }
    catch(err) {
        
        var config = require('./config');
        gutil.log(gutil.colors.yellow('Using Clients Config... To use your own config copy this over to your version.'));
        
    }    

    for(var result in modules) {
        
        try {
            
            if(customTasks.indexOf(modules[result]) >= 0) continue;
            
        }
        
        catch(err) {
            
            gutil.log(gutil.colors.red(err));
            
        };
        
        try {

            var deferred = Q.defer();

            tasks[result] = {};
            tasks[result].name = modules[result].split('.js')[0];
            
            if(tasks[result].name[0] === '.') continue;
            tasks[result].func = require('./tasks/'+tasks[result].name+'.js');

            deferred.resolve(function() {

                gulp.task(tasks[result].name);

                if(process.argv[2] === tasks[result].name) {

                    tasks[result].func.init(config);

                } else if(process.argv[2] === undefined && tasks[result].func.default === true) {

                    tasks[result].func.init(config);

                }

            }());
            
        }        

        catch(err) {
            
            gutil.log(gutil.colors.red(err));
            
        };
        
    }
    
    try {        
            
        for(var result in customTasks) {

            var customDeferred = Q.defer();

            tasks[result] = {};
            tasks[result].name = customTasks[result].split('.js')[0];
            if(tasks[result].name[0] === '.') continue;                
            tasks[result].func = require(process.env.PWD+'/floe-gulp/tasks/'+tasks[result].name+'.js');           

             customDeferred.resolve(function() {

                gulp.task(tasks[result].name);

                if(process.argv[2] === tasks[result].name) {

                    tasks[result].func.init(config);

                } else if(process.argv[2] === undefined && tasks[result].func.default === true) {

                    tasks[result].func.init(config);

                }

            }());

        }            

    } catch(err) {
        
        gutil.log(gutil.colors.red(err));
        
    };        

}