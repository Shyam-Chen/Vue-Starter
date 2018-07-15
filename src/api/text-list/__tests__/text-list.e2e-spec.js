import request from 'supertest';

describe('TextList', () => {
  it('should get a text list', async () => {
    const { statusCode, body } = await request(global.FUNC_URL)
      .get('/api/text-list');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });
});
