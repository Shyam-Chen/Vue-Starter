import { email } from '../regexp';

describe('Utils', () => {
  it('should handle email', () => {
    expect(email.test('shyam.chen@gmail.com')).toBe(true);
    expect(email.test('français@gmail.com')).toBe(false);
  });
});
