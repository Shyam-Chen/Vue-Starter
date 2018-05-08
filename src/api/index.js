// @flow

import express from 'express';

import helloWorld from '~/hello-world';
import textList from '~/text-list';

const router = express.Router();

router.use('/hello-world', helloWorld);
router.use('/text-list', textList);

export default router;
