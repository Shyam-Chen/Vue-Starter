import assignDeep from '../assign-deep';

describe('Utils', () => {
  it('should assign deep', () => {
    const target = { foo: { a: 1, b: [1, 2, 3] } };
    const source = { foo: { b: [7], c: true } };
    const specification = { foo: { a: 1, b: [7], c: true } };

    expect(assignDeep(target, source)).toEqual(specification)
  });
});
