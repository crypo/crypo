'use strict';

var babel = require('gulp-babel');
var del = require('del');
var gulp = require('gulp');
var derequire = require('gulp-derequire');
var flatten = require('gulp-flatten');
var runSequence = require('run-sequence');
var assign = require('object-assign');
var webpackStream = require('webpack-stream');

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

var buildDist = function(opts) {
  var webpackOpts = {
    debug: opts.debug,
    output: {
      filename: opts.output,
      libraryTarget: 'var',
      library: 'Crypo',
    },
    plugins: [
      new webpackStream.webpack.optimize.OccurenceOrderPlugin(),
      new webpackStream.webpack.optimize.DedupePlugin(),
    ],
  };
  if (!opts.debug) {
    webpackOpts.plugins.push(
      new webpackStream.webpack.optimize.UglifyJsPlugin({
        compress: {
          hoist_vars: true,
          screw_ie8: true,
          warnings: false,
        },
      })
    );
  }
  return webpackStream(webpackOpts, null, function(err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err);
    }
    if (stats.compilation.errors.length) {
      gulpUtil.log('webpack', '\n' + stats.toString({colors: true}));
    }
  });
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

gulp.task('dist', ['modules'], function() {
  var opts = {
    debug: true,
    output: 'Crypo.js',
  };
  return gulp.src('./lib/Crypo.js')
    .pipe(buildDist(opts))
    .pipe(derequire())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('dist:min', ['modules'], function() {
  var opts = {
    debug: false,
    output: 'Crypo.min.js',
  };
  return gulp.src('./lib/Crypo.js')
    .pipe(buildDist(opts))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['modules']);
})

gulp.task('default', function(cb) {
  runSequence('clean', 'modules', ['dist', 'dist:min'], cb);
});
