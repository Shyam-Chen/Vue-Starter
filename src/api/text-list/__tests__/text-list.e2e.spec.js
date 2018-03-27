import request from 'supertest';

describe('Text List', () => {
  it('should get a text list', async () => {
    const { statusCode } = await request('https://us-central1-vue-by-example-dev.cloudfunctions.net')  // request(global.FUNC_URL)
      .get('/api/text-list');

    expect(statusCode).toBe(200);
  });
});
