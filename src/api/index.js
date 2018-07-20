// @flow

import { Router } from 'express';

import helloWorld from '~/hello-world';
import textList from '~/text-list';

const router: Router = Router();

router.get('/', (req: $Request, res: $Response): void => {
  res.status(200).send('API Root');
});

router.use('/hello-world', helloWorld);
router.use('/text-list', textList);

export default router;
