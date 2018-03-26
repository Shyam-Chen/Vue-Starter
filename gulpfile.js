const gulp = require('gulp');
const util = require('gulp-util');
const replaces = require('gulp-replaces');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const rimraf = require('gulp-rimraf');
const envify = require('process-envify');
const runSequence = require('run-sequence');

const env = require('./env');

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
    .pipe(replaces(envify(env)))
    .pipe(babel())
    .pipe(gulp.dest('functions')),
);

gulp.task('copy', () =>
  gulp.src(['./package.json', './yarn.lock'])
    .pipe(gulp.dest('functions')),
);

gulp.task('rename', () =>
  gulp.src('./functions/server.js')
    .pipe(rimraf())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('functions')),
);

gulp.task('default', done => runSequence(
  'build', ['copy', 'rename'], done,
));
