const gulp = require('gulp');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function () {
	// app.js is your main JS file with all your module inclusions
	return browserify({
		entries: 'src/js/main.jsx',
		debug: true,
		ignoreMissing: true,
		detectGlobals: false,
	})
		.transform('babelify', {
			presets: ['es2016', 'react', 'es2015', 'stage-0'],
		})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['build'], function () {
	gulp.watch('./src/js/**', ['build']);
});

gulp.task('default', ['watch']);
