
'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const exit = require('gulp-exit');
// @todo Image Optimization https://www.npmjs.com/package/gulp-imagemin

const nodemon = require('nodemon');




gulp.task('start', () => {
  nodemon({
    script: 'web/server.js',
    ext: 'js mustache',
    env: {'NODE_ENV': 'development'}
  });
});

gulp.task('exit', () => {
  return exit();
});




gulp.task('sass', () => {

  gulp.src('./node_modules/font-awesome/fonts/**.*')
    .pipe(gulp.dest('./www/compiled/fonts/'));

  return gulp.src('./www/scss/bootstrap.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/compiled/css/'));
});

gulp.task('sass:build', () => {
  return gulp.src('./www/scss/bootstrap.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/compiled/css/'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./www/scss/*.scss', ['sass']);
});




function preScripts() {
  return gulp.src('./www/js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/compiled/js/'));
}

gulp.task('scripts', async () => {

  await preScripts();

  return gulp.src([
    './node_modules/babel-polyfill/dist/polyfill.js',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/chart.js/dist/Chart.bundle.min.js',
    './www/compiled/js/app.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/compiled/js/'));
});

gulp.task('scripts:build', async () => {

  await preScripts();

  return gulp.src([
    './node_modules/babel-polyfill/dist/polyfill.js',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/chart.js/dist/Chart.bundle.min.js',
    './www/compiled/js/app.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/compiled/js/'));
});

gulp.task('scripts:watch', () => {
  gulp.watch('./www/js/*.js', ['scripts']);
});




gulp.task('default', ['sass', 'sass:watch', 'scripts', 'scripts:watch', 'start']);
gulp.task('build', ['sass:build', 'scripts:build', 'exit']);
