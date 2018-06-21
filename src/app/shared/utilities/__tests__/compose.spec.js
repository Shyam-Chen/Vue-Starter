import compose from '../compose';

describe('Utilities', () => {
  it('should compose from left to right', () => {
    const double = x => x * 2;
    const square = x => x * x;

    expect(compose(double, square)(5)).toBe(100);
  });

  it('should be seeded with multiple arguments', () => {
    const add = (x, y) => x + y;
    const square = x => x * x;

    expect(compose(add, square)(1, 2)).toBe(9);
  });
});
