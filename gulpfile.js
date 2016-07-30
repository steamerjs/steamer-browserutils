var gulp = require('gulp'),
	babel = require('gulp-babel');


gulp.task('default', () => {
	return gulp.src('src/es6.js')
        .pipe(babel({
            presets: ['es2015-loose']
        }))
        .pipe(gulp.dest('dist'));
});