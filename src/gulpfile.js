var browserify = require('browserify');
var gulp = require('gulp');
// var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');

var opts = {
  mainJsInput: './App/app.js',
  mainJsOutput: 'app.js',
  buildFolder: './build/',
  indexHtml: './App/index.html',
  watchedFiles: [
    './App/**/*'
  ]
};

gulp.task('index', function() {
  gulp.src(opts.indexHtml)
    .pipe(gulp.dest(opts.buildFolder));
});

gulp.task('compile', function() {
  var b = browserify();
  b.transform(babelify);
  b.add(opts.mainJsInput);
  return b.bundle()
    .pipe(source(opts.mainJsInput))
    .pipe(rename(opts.mainJsOutput))
    .pipe(gulp.dest(opts.buildFolder));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: opts.buildFolder
    }
  });
});

gulp.task('default', ['browser-sync', 'compile', 'index'], function() {
  gulp.watch(opts.watchedFiles, ['compile', 'index', browserSync.reload]);
});
