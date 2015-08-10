var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jeet = require('jeet');
var rupture = require('rupture');
// var browserSync = require('browser-sync');
var gulpBabel = require('gulp-babel');
var del = require('del');

gulp.task('taskname', function() {
    console.log('Hello');
});

// Delete the build folder content
gulp.task('clear', function () {
    del([
        // 'dist/report.csv',
        // here we use a globbing pattern to match everything inside build folder
        'build/**/*',
    ]);
});

// Copy the Pages files
gulp.task('copyHtmlPages', function() {

    return gulp.src('src/pages/**/*.html')
        .pipe(gulp.dest('./build/static/'))
        // get the browser to refresh on files
        //.pipe(browserSync.reload({stream: true}))
});

// Copy the View Template files
gulp.task('copyHbsViews', function() {

    return gulp.src('src/views/**/*.hbs')
        .pipe(gulp.dest('./build/views/'))
        // get the browser to refresh on files
        // .pipe(browserSync.reload({stream: true}))
});

// Copy the Server Support files
gulp.task('copyServerSupport', function() {

    return gulp.src('src/server/**/**')
        .pipe(gulp.dest('./build/server/'))
        // get the browser to refresh on files
        // .pipe(browserSync.reload({stream: true}))
});

// Copy the Server Support files
gulp.task('copyImages', function() {

    return gulp.src('src/img/**/**')
        .pipe(gulp.dest('./build/static/img/'))
        // get the browser to refresh on files
        // .pipe(browserSync.reload({stream: true}))
});

// Compile Stylus files
gulp.task('stylus', function () {
    gulp.src('src/css/**/*.styl')
        .pipe(stylus({
            use: [
                nib(),
                jeet(),
                rupture()
            ]
        }))
        .pipe(gulp.dest('./build/static/css/'));
});

// Use babel to complile jsx components into javascript
// So that when rendering components on the server you dont need to worry about the JSX tranpiling
gulp.task('babelComponents', function() {

    return gulp.src('src/components/**/*.js')
        .pipe(gulpBabel())
        .pipe(gulp.dest('./build/components/'))
        // get the browser to refresh on files
        // .pipe(browserSync.reload({stream: true}))
});

// Use babel to complile other js into javascript
gulp.task('babelJs', function() {

    return gulp.src('src/js/**/*.js')
        .pipe(gulpBabel())
        .pipe(gulp.dest('./build/public/js/'))
        // get the browser to refresh on files
        // .pipe(browserSync.reload({stream: true}))
});

// run a server to help with reloads etc
/*
gulp.task('browserSync', function() {
    browserSync({
        // tell the server where to get its files
        server: {
            baseDir: './build'
        }
    });
});
*/

// tell the server to watch the files for changes
gulp.task('watchFiles', function() {
    gulp.watch('src/**/*.html', [
        'copyHtmlPages'
    ]);
    gulp.watch('src/**/*.hbs', [
        'copyHbsViews'
    ]);
    gulp.watch('src/server/**/*.js', [
        'copyServerSupport'
    ]);
    gulp.watch('src/components/**/*.js', [
        'babelComponents'
    ]);
    gulp.watch('src/js/**/*.js', [
        'babelJs'
    ]);
    gulp.watch('src/css/**/*.styl', [
        'stylus'
    ]);

});

gulp.task('default', [
    //'clear',
    'taskname',
    'stylus',
    'copyImages',
    'babelComponents',
    'babelJs',
    'copyHtmlPages',
    'copyHbsViews',
    'copyServerSupport',
    //'browserSync',
    'watchFiles'
]);

/*
var nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
    nodemon({
        script: 'bin/www',
        ext: 'js ejs',
    });
});
*/