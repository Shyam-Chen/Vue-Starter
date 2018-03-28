import router from '../';

describe('Hello World', () => {
  it('should handle routes', () => {
    const req = {};

    const res = {
      status(code) {
        expect(code).toBe(200);
        return this;
      },
      send(msg) {
        expect(msg).toBe('Hello, World!');
        return this;
      },
    };

    router.stack[0].route.stack[0].handle(req, res);
  });
});
