import request from 'supertest';

describe('HelloWorld', () => {
  it('should get a text', async () => {
    const { statusCode, text } = await request(global.FUNC_URL)
      .get('/api/hello-world');

    expect(statusCode).toBe(200);
    expect(text).toBe('Hello, World!');
  });
});
