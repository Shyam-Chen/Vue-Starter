import mutations from '../mutations';

describe('mutations', () => {
  let [state] = [];

  beforeEach(() => {
    state = { value: 0 };
  });

  it('should handle increment', () => {
    const { increment } = mutations;
    increment(state);
    expect(state.value).toEqual(1);
  });

  it('should handle decrement', () => {
    const { decrement } = mutations;
    decrement(state);
    expect(state.value).toEqual(-1);
  });
});
