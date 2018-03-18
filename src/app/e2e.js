import { join } from 'path';
import express from 'express';
import history from 'express-history-api-fallback';

const app = express();
const root = join(__dirname, '../../public');

app.use(express.static(root));
app.use(history('index.html', { root }));

app.listen(process.env.PORT || 3000);

export default app;
