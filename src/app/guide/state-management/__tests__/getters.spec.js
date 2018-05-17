import getters from '../getters';

describe('getters', () => {
  it('should return even', () => {
    const state = { value: 0 };
    const result = getters.evenOrOdd(state);
    expect(result).toBe('even');
  });

  it('should return odd', () => {
    const state = { value: 1 };
    const result = getters.evenOrOdd(state);
    expect(result).toBe('odd');
  });
});
