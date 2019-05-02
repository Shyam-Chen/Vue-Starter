import { escape, email } from '../regexp';

describe('Utils', () => {
  it('should handle escape', () => {
    const str = 'foo + bar'.replace(escape, '\\$&');
    expect(str).toBe('foo \\+ bar');
  });

  it('should handle email', () => {
    expect(email.test('shyam.chen@gmail.com')).toBe(true);
    expect(email.test('shyamchen@gmailcom')).toBe(false);
  });
});
