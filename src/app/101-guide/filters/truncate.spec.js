import truncate from './truncate';

describe('truncate', () => {
  it('should handle', () => {
    const foo = truncate('foo');
    const longText = truncate('text text text text');
    const customLength = truncate('text text text text', 10);
    const empty = truncate();

    expect(foo).toMatch('foo');
    expect(longText).toMatch('text text text ...');
    expect(customLength).toMatch('text text ...');
    expect(empty).toMatch('');
  });
});
