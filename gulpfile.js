var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS    = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		sourcemaps = require('gulp-sourcemaps');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
	browserSync.init({
		server: {
			baseDir: "./assets"
		},
		notify: false
	});
});

gulp.task('styles', function () {
	gulp.src('assets/sass/*.scss')
        .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
		.pipe(cleanCSS())
        .pipe(sourcemaps.write('.', { sourceRoot: 'css-source' }))
		.pipe(gulp.dest('assets/styles/'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./assets/libs/jquery/dist/jquery.min.js',
        // './assets/libs/pushy/js/pushy.js',
		'./assets/libs/slick-carousel/slick/slick.min.js',
        './assets/libs/select2/dist/js/select2.full.js',
		'./assets/js/common.js'
		])
		.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./assets/js/'));
});

gulp.task('watch', function () {
	gulp.watch('assets/sass/*.scss', ['styles']);
	gulp.watch('assets/libs/**/*.js', ['scripts']);
	gulp.watch('assets/js/*.js', ['scripts']);
	//gulp.watch('assets/js/*.js').on("change", browserSync.reload);
	// gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);

