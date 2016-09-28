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
    nodemon = require('gulp-nodemon'),
    config = require('./server.config.json');


// Static server
gulp.task('serve', ['browser-sync', 'inject'], () => {
    gulp.watch("./**").on('change', reload);
    gulp.watch('./**/*.less', ['less']);
});

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync({
        proxy: "localhost:" + config.port.internal, // local node app address
        port: config.port.external, // use *different* port than above
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

gulp.task('inject', () => {
    var target = gulp.src('./web/index/index.view.html');
    var sources = gulp.src(['./web/**/*.js'], { read: false });

    return target
        .pipe(inject(sources, { ignorePath: 'web' }))
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