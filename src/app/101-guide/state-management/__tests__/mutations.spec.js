import { INITIAL } from '../constants';
import mutations from '../mutations';

describe('mutations', () => {
  let [state] = [];

  beforeEach(() => {
    state = { ...INITIAL };
  });

  it('should handle increment', () => {
    const { increment } = mutations;
    increment(state, 1);
    expect(state.value).toEqual(1);
  });

  it('should handle decrement', () => {
    const { decrement } = mutations;
    decrement(state, 1);
    expect(state.value).toEqual(-1);
  });
});
