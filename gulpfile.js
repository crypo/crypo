'use strict';

var babel = require('gulp-babel');
var del = require('del');
var gulp = require('gulp');
var flatten = require('gulp-flatten');
var runSequence = require('run-sequence');
var assign = require('object-assign');

var babelPluginModules = require('fbjs-scripts/babel/rewrite-modules');
var babelPluginDEV = require('fbjs-scripts/babel/dev-expression');

var babelOpts = {
  blacklist: [
    'es6.regex.unicode',
  ],
  nonStandard: true,
  optional: [
    'es7.trailingFunctionCommas',
    'es7.classProperties',
  ],
  stage: 1,
  plugins: [babelPluginModules],
  _moduleMap: assign({}, require('fbjs/module-map')),
};

var paths = {
  lib: 'lib',
  dist: 'dist',
  src: 'src/**/*.js',
};

gulp.task('clean', function() {
  return del([paths.dist, paths.lib]);
});

gulp.task('modules', function() {
  return gulp
    .src(paths.src)
    .pipe(babel(babelOpts))
    .pipe(flatten())
    .pipe(gulp.dest(paths.lib));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['modules']);
})

gulp.task('default', function(cb) {
  runSequence('clean', 'modules', cb);
});
