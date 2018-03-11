import mutations from '../mutations';
import { INCREMENT, DECREMENT } from '../constants';

describe('mutations', () => {
  let [state] = [];

  beforeEach(() => {
    state = { value: 0 };
  });

  it('should handle increment', () => {
    const increment = mutations[INCREMENT];
    increment(state);
    expect(state.value).toEqual(1);
  });

  it('should handle decrement', () => {
    const decrement = mutations[DECREMENT];
    decrement(state);
    expect(state.value).toEqual(-1);
  });
});
