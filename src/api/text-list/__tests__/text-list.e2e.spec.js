import request from 'supertest';

import { FUNC_URL } from '../../../../env';

jest.setTimeout(20000);

describe('Text List', () => {
  it('should get a text list', async () => {
    const { statusCode } = await request(FUNC_URL)
      .get('/api/text-list');

    expect(statusCode).toBe(200);
  });
});
