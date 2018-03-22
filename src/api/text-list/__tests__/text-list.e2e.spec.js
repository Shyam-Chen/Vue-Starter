import request from 'supertest';

const { FUNC_URL } = process.env;

describe('Text List', () => {
  it('should get a text list', async () => {
    const { statusCode } = await request(FUNC_URL)
      .get('/api/text-list');

    expect(statusCode).toBe(200);
  });
});
