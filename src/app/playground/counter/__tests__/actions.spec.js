import actions from '../actions';
import { INCREMENT, DECREMENT } from '../constants';

describe('actions', () => {
  it('should handle increment', () => {
    const commit = (type, payload) => {
      expect(type).toBe(INCREMENT);
      expect(payload).toBeUndefined();
    };

    actions.increment({ commit });
  });

  it('should handle decrement', () => {
    const commit = (type, payload) => {
      expect(type).toBe(DECREMENT);
      expect(payload).toBeUndefined();
    };

    actions.decrement({ commit });
  });

  it('should handle incrementAsync', () => {
    const commit = (type, payload) => {
      expect(type).toBe(INCREMENT);
      expect(payload).toBeUndefined();
    };

    actions.incrementAsync({ commit });
  });

  it('should handle decrementAsync', () => {
    const commit = (type, payload) => {
      expect(type).toBe(DECREMENT);
      expect(payload).toBeUndefined();
    };

    actions.decrementAsync({ commit });
  });

  it('should handle incrementIfOdd', () => {
    const commit = (type, payload) => {
      expect(type).toBe(INCREMENT);
      expect(payload).toBeUndefined();
    };

    const state = { value: 1 };

    actions.decrementAsync({ commit, state });
  });

  it('should handle decrementIfEven', () => {
    const commit = (type, payload) => {
      expect(type).toBe(DECREMENT);
      expect(payload).toBeUndefined();
    };

    const state = { value: 0 };

    actions.decrementAsync({ commit, state });
  });
});
