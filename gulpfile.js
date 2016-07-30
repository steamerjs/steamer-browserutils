var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat');


gulp.task('default', () => {
	return gulp.src(['./src/libs/common.js', 
					 './src/libs/class.js', 
					 './src/libs/cookie.js',
					 './src/libs/date.js',
					 './src/libs/localstorage.js',
					 './src/libs/safe.js',
					 './src/libs/type.js',
					 './src/libs/url.js',
					])
    		   .pipe(concat('index.js'))
     		   .pipe(gulp.dest('./'));
});