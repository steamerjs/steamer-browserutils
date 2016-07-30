var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat');

var mapping = {
	'common': './src/libs/common.js',
	'class': './src/libs/class.js',
	'cookie': './src/libs/cookie.js',
	'date': './src/libs/date.js',
	'localstorage': './src/libs/localstorage.js',
	'native': './src/libs/native.js',
	'safe': './src/libs/safe.js',
	'type': './src/libs/type.js',
	'url': './src/libs/url.js',
};

var srcLibs = [];
Object.keys(mapping).map((item, index) => {
	srcLibs.push(mapping[item]);
});

gulp.task('es5', () => {
	return gulp.src(srcLibs)
    		   .pipe(concat('index.js'))
    		   .pipe(babel({
		            presets: ['es2015-loose']
		        }))
     		   .pipe(gulp.dest('./'));
});

gulp.task('es6', () => {
	return gulp.src(srcLibs)
    		   .pipe(concat('es6.js'))
     		   .pipe(gulp.dest('./'));
});

gulp.task('default', ['es5', 'es6'], (cb) => {
	console.log("success");
	cb();
});