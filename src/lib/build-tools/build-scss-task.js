const gulp = require('gulp'),
path = require('path');
const gulpSass = require('gulp-sass');
const gulpIf = require('gulp-if');
const gulpCleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

async function buildScssTask(outputDir, sourceDir, minifyOutput = false) {
    return gulp.src(path.join(sourceDir, '**/*.scss'))
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(autoprefixer())
      .pipe(gulpIf(minifyOutput, gulpCleanCss()))
      .pipe(gulp.dest(outputDir));
}

module.exports = buildScssTask;
