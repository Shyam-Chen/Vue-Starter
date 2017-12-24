import { join } from 'path';
import { readFileSync } from 'fs';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import history from 'express-history-api-fallback';
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  const root = join(__dirname, '../build');

  app.use(express.static(root));
  app.use(history('index.html', { root }));

  app.get('*', (req, res) => {
    const vue = new Vue({
      data: {
        url: req.url
      },
      template: `<div>{{ url }}</div>`
    });

    const renderer = createRenderer({
      template: readFileSync('./index.html', 'utf-8')
    });

    renderer.renderToString(vue, (err, html) => {
      if (err) {
        res.status(500).end('Internal Server Error');
        return;
      }

      res.end(html);
    });
  });
}

const server = app.listen(app.get('port'), () => {
  console.log('App: Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});

export default server;
