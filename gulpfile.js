/* jshint node:true */
'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var connect = require('connect');
var serveStatic = require('serve-static');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');


/** Config variables */
var PORT = 8080;
var LIVE_SERVER_OPTS = { port: 35731 };

/** File paths */
var dist = 'dist/app';

var entryFiles = ['./src/js/main.js'];
var htmlFiles = 'src/**/*.html';
var htmlBuild = dist;


var bundler = watchify(browserify({
    entries: entryFiles,
    debug: true,
    transform: [babelify]
}));

gulp.task('sass', function() {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefix("last 5 versions", "> 1%"))
        .pipe(gulp.dest('./dist/app/css'))
        .pipe(livereload());
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
});


gulp.task('html', function () {
    return gulp.src(htmlFiles)
        .pipe(gulp.dest(htmlBuild));
});

gulp.task('browserify', function () {
    var rebundle = function () {
        return bundler.bundle().
            on('error', function (err) {
                console.error(err);
            })
            .pipe(source('app.js'))
            .pipe(plumber())
            .pipe(gulp.dest(dist + '/bundle/'))
            .pipe(livereload());
    };
    bundler.on('update', rebundle);
    return rebundle();
});

gulp.task('build', function() {
    process.env.NODE_ENV = 'production';

    var rebundle = function () {
        return bundler.bundle()
            .on('error', function (err) { console.error(err); })
            .pipe(source('app.js'))
            .pipe(plumber())
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(dist + '/bundle/'))
            .pipe(livereload());
    };
    bundler.on('update', rebundle);
    return rebundle();
});

gulp.task('server', function (next) {
    var server = connect();
    try {
        server.use(serveStatic(dist)).listen(PORT, next);
    } catch (e) {
        console.log('something bad happened starting the server');
        console.error(e);
    }
});

gulp.task('watch', function () {
    livereload.listen(LIVE_SERVER_OPTS);
    gulp.watch(htmlFiles, ['html']);
});



gulp.task('default', ['html', 'server', 'browserify', 'sass', 'sass:watch', 'watch']);
