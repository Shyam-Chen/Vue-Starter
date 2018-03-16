import { join } from 'path';
// import { readFileSync } from 'fs';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import history from 'express-history-api-fallback';
// import Vue from 'vue';
// import { createRenderer } from 'vue-server-renderer';

import { PORT } from './env';

const app = express();

app.use(compression());
app.use(cors({ origin: true }));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  const root = join(__dirname, '../build');

  app.use(express.static(root));
  app.use(history('index.html', { root }));

  // app.get('*', (req, res) => {
  //   const vue = new Vue({
  //     data: {
  //       url: req.url,
  //     },
  //     template: '<div>{{ url }}</div>',
  //   });
  //
  //   const renderer = createRenderer({
  //     template: readFileSync('./index.html', 'utf-8'),
  //   });
  //
  //   renderer.renderToString(vue, (err, html) => {
  //     if (err) {
  //       res.status(500).end('Internal Server Error');
  //       return;
  //     }
  //
  //     res.end(html);
  //   });
  // });
}

const server = app.listen(PORT, () => {
  console.log(' [*] App: Bootstrap Succeeded.');
  console.log(` [*] Host: http://localhost:${PORT}/.`);
});

export default server;
