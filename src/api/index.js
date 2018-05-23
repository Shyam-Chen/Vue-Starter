// @flow

import { Router } from 'express';

import helloWorld from '~/hello-world';
import textList from '~/text-list';

const router: Router = Router();

router.use('/hello-world', helloWorld);
router.use('/text-list', textList);

export default router;
