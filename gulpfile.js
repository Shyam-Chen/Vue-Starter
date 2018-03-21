const gulp = require('gulp');
const util = require('gulp-util');
const batchReplace = require('gulp-batch-replace');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const rimraf = require('gulp-rimraf');
const dotenv = require('dotenv');
const runSequence = require('run-sequence');

gulp.task('clean', () =>
  gulp.src('./functions/**/*', { read: false })
    .pipe(rimraf({ force: true })),
);

gulp.task('build', () => {
  const replaces = {};
  const keys = Object.keys(dotenv.config().parsed);
  const values = Object.values(dotenv.config().parsed);

  for (let i = 0, l = keys.length; i < l; i++) {
    replaces[`process.env.${keys[i]}`] = JSON.stringify(values[i]);
  }

  return gulp
    .src([
      'src/**/*',
      '!src/index.html',
      '!src/client.js',
      '!src/app', '!src/app/**/*',
      '!src/assets', '!src/assets/**/*',
      '!src/**/__tests__', '!src/**/__tests__/**/*',
    ])
    .pipe(!util.env.prod ? batchReplace(Object.entries(replaces)) : util.noop())
    .pipe(babel())
    .pipe(gulp.dest('functions'));
});

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
  'clean', 'build', ['copy', 'rename'], done,
));
