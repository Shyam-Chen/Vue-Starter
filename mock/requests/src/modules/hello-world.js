import Router from '@koa/router';

const router = new Router({ prefix: '/hello-world' });

router.get('/', (ctx) => {
  ctx.body = { mod: 'hello-world' };
});

export default router;
