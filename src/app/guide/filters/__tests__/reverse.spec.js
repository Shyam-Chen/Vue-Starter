import reverse from '../reverse';

describe('reverse', () => {
  it('should handle', () => {
    expect(reverse('foo')).toMatch('oof');
    expect(reverse(['foo', 'bar', 'baz'])).toEqual(['baz', 'bar', 'foo']);
    expect(reverse(123)).toEqual(123);
  });
});
