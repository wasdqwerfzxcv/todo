var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5001",
        files: ["app/**/*.*"],
        browser: "google chrome",
        port: 7001,
	});
});

gulp.task('nodemon', function () {

	return nodemon({script: 'app.js'})
	.on('restart', function(){
	  console.log("refreshing browser...");
	});

});

gulp.task('default', ['browser-sync'], function () {
});
