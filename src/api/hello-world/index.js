import express from 'express';

const router = express.Router();

/**
 * @return {string}
 *
 * @example GET /api/hello-world
 */
router.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

export default router;
