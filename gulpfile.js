/*jshint esversion: 6 */
const
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    watch = require('gulp-watch'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    less = require('gulp-less'),
    path = require('path'),
    nodemon = require('gulp-nodemon');


// Static server
gulp.task('serve', ['browser-sync'], () => {
    gulp.watch("./**").on('change', reload);
    gulp.watch('./**/*.less', ['less']);
});

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync({
        proxy: "localhost:3000", // local node app address
        port: 5000, // use *different* port than above
        notify: true
    });
});

gulp.task('nodemon', (cb) => {
    var called = false;
    return nodemon({
            script: 'server.js',
            ignore: [
                'gulpfile.js',
                'node_modules/'
            ]
        })
        .on('start', () => {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', () => {
            setTimeout(() => {
                reload({ stream: false });
            }, 1000);
        });
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
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./web'));
});