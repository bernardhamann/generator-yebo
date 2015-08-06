var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jeet = require('jeet');
var rupture = require('rupture');

gulp.task('stylus', function () {
  gulp.src('./public/css/*.styl')
    .pipe(stylus({
        use: [
                nib(),
                jeet(),
                rupture()
        ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.styl', ['stylus']);
});

gulp.task('develop', function () {
  nodemon({
    script: 'bin/www',
    ext: 'js ejs',
    });
});

gulp.task('default', [
  'stylus',
  'develop',
  'watch'
]);
