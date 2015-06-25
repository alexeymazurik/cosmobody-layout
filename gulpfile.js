var gulp = require('gulp');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var paths = {
  fonts: ['./bower_components/ratchet/dist/fonts/*.*'],
  sass: ['./src/scss/**/*.scss'],
  scripts: ['./bower_components/ratchet/dist/js/ratchet.min.js']
};

gulp.task('serve', function() {
  connect.server({
    livereload: false,
    root: 'public'
  });
});

gulp.task('fonts', function(){
  gulp.src(paths.fonts)
  .pipe(gulp.dest('./public/fonts/'));
})

gulp.task('scripts', function(){
  gulp.src(paths.scripts)
    .pipe(gulp.dest('./public/js/'));
})

gulp.task('sass', function() {
  gulp.src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(autoprefixer())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass', 'scripts', 'serve', 'watch', 'fonts']);
