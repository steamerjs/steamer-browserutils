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

gulp.task('default', () => {
	return gulp.src(srcLibs)
    		   .pipe(concat('index.js'))
     		   .pipe(gulp.dest('./'));
});