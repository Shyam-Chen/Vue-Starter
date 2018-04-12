import request from 'supertest';

describe('Text List', () => {
  it('should get a text list', async () => {
    const { statusCode, text } = await request(global.FUNC_URL)
      .get('/api/text-list');

    expect(statusCode).toBe(200);

    console.log(text);
  });
});
