const gulp = require('gulp');  //npm install gulp --save-dev
const sass = require('gulp-sass'); //npm install gulp-sass --save-dev
const autoprefixer = require('gulp-autoprefixer'); //npm install --save-dev gulp-autoprefixer
const concat = require('gulp-concat') //npm install --save-dev gulp-concat
// const browserSync = require('browser-sync').create(); npm install browser-sync gulp --save-dev

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/'))
});

gulp.task('default', ['sass'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass'])
})
