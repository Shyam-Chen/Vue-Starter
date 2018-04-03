const path = require('path');
const gulp = require('gulp');
const util = require('gulp-util');
const plumber = require('gulp-plumber');
const replaces = require('gulp-replaces');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const rimraf = require('gulp-rimraf');
const envify = require('process-envify');
const runSequence = require('run-sequence');

const env = require('./env');

const DIST_ROOT = path.join(__dirname, 'functions');

gulp.task('build', () =>
  gulp
    .src([
      'src/**/*',
      '!src/index.html',
      '!src/client.js',
      '!src/app', '!src/app/**/*',
      '!src/assets', '!src/assets/**/*',
      '!src/**/__tests__', '!src/**/__tests__/**/*',
    ])
    .pipe(plumber())
    .pipe(replaces(envify(env)))
    .pipe(babel())
    .pipe(gulp.dest(DIST_ROOT)),
);

gulp.task('copy', () =>
  gulp.src(['./package.json', './yarn.lock'])
    .pipe(gulp.dest(DIST_ROOT)),
);

gulp.task('rename', () =>
  gulp.src('./functions/server.js')
    .pipe(rimraf())
    .pipe(rename('index.js'))
    .pipe(gulp.dest(DIST_ROOT)),
);

gulp.task('rebuild', done => runSequence('build', 'rename', done));

gulp.task('watch', () => {
  gulp.watch([
    'src/server.js',
    'src/api/**/*',
    '!src/api/**/__tests__/**/*',
  ], ['rebuild']);
});

gulp.task('serve', () => {
  // TODO: firebase serve
});

gulp.task('default', (done) => {
  if (util.env.prod) {
    return runSequence('build', ['copy', 'rename'], done);
  }

  return runSequence('build', 'rename', 'watch', done);
});
