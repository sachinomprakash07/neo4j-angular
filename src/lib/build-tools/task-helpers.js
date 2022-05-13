const gulpSass = require('gulp-sass'),
      path = require('path'),
      gulpCleanCss = require('gulp-clean-css'),
      gulp = require('gulp'),
      gulpSourcemaps = require('gulp-sourcemaps'),
      gulpIf = require('gulp-if');
      
function _globify(maybeGlob, suffix = '**/*') {
  if (maybeGlob.indexOf('*') != -1) {
    return maybeGlob;
  }
  try {
    const stat = fs.statSync(maybeGlob);
    if (stat.isFile()) {
      return maybeGlob;
    }
  } catch (e) {}
  return path.join(maybeGlob, suffix);
}

/** Create a SASS Build Task. */
function sassBuildTask(dest, root, minify = false) {
  return () => {
    return gulp.src(_globify(root, '**/*.scss'))
      .pipe(gulpSourcemaps.init({ loadMaps: true }))
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulpIf(minify, gulpCleanCss()))
      .pipe(gulpSourcemaps.write('.'))
      .pipe(gulp.dest(dest));
  };
}

module.exports.sassBuildTask = sassBuildTask;