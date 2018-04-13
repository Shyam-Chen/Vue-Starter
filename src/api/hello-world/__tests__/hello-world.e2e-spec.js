import request from 'supertest';

describe('Text List', () => {
  it('should get a text list', async () => {
    const { statusCode } = await request(global.FUNC_URL)
      .get('/api/hello-world');

    expect(statusCode).toBe(200);
  });
});
