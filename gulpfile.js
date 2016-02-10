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
var coffee = require('gulp-coffee');

var prefix = require('gulp-autoprefixer');

/** Config variables */
var PORT = 8080;
var LIVE_SERVER_OPTS = {
    port: 35731
};


/** File paths */
var dist = 'dist/app';

var entryFile = './src/js/main.js';
var htmlFiles = 'src/**/*.html';
var htmlBuild = dist;

var vendorFiles = [
    'bower_components/react/react-with-addons.js',
    'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'];
var vendorBuild = dist + '/vendor';


/** globals **/
var WATCH = true;

var bundler = browserify(entryFile, {
    debug: true,
    transform: [babelify]
});

if (WATCH) {
    bundler = watchify(bundler);
}


gulp.task('vendor', function () {
    return gulp.src(vendorFiles)
        .pipe(gulp.dest(vendorBuild));
});

gulp.task('sass', function() {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
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
            //.pipe(coffee())
            .pipe(gulp.dest('dist/app/bundle/'))
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

/**
 * Run default task
 */
gulp.task('default', ['vendor', 'html','server', 'browserify', 'sass', 'sass:watch', 'watch']);