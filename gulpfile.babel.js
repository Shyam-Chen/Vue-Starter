import { resolve, join } from 'path';
import gulp from 'gulp';
import express from 'express';
import fallback from 'express-history-api-fallback';
import { webdriver_update, protractor } from 'gulp-protractor';

export const TEST_PORT = 8080;

export const SOURCE_ROOT = join(__dirname, 'src');
export const DIST_ROOT = join(__dirname, 'build');

export class Protractor {
  server(port, dir) {
    const app = express();
    const root = resolve(process.cwd(), dir);

    app.use(express.static(root));
    app.use(fallback('index.html', { root }));

    return new Promise(resolve => {
      const server = app.listen(port, () => {
        resolve(server);
      });
    });
  }
}

gulp.task('webdriver', webdriver_update);

gulp.task('e2e', done => {
  new Protractor()
    .server(TEST_PORT, DIST_ROOT)
    .then(server => {
      gulp.src(join(SOURCE_ROOT, '**/*.e2e-spec.js'))
        .pipe(protractor({ configFile: join(__dirname, 'protractor.conf.js') }))
        .on('error', error => { throw error; })
        .on('end', () => server.close(done));
    });
});
