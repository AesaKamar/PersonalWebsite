/*jshint esversion: 6 */
const
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    watch = require('gulp-watch'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    less = require('gulp-less'),
    path = require('path');


// Static server
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./web"
        }
    });

    gulp.watch("./**").on('change', browserSync.reload);
    gulp.watch('./**/*.less', ['less']);
});

gulp.task('index', () => {
    var target = gulp.src('./web/index/index.html');
    var sources = gulp.src(['./web/**/*.js', './web/*.css'], { read: false });

    return target.pipe(inject(sources))
        .pipe(angularFilesort())
        .pipe(gulp.dest('./web/index'));
});
 
gulp.task('less', () => {
  return gulp.src('./web/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./web'));
});