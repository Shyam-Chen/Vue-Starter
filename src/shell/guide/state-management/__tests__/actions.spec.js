import { INITIAL } from '../constants';
import actions from '../actions';

jest.useFakeTimers();

describe('actions', () => {
  it('should handle increment', () => {
    const state = { ...INITIAL };

    const commit = (type, payload) => {
      expect(type).toBe('increment');
      expect(payload).toBe(1);
    };

    actions.increment({ state, commit });
  });

  it('should handle decrement', () => {
    const state = { ...INITIAL };

    const commit = (type, payload) => {
      expect(type).toBe('decrement');
      expect(payload).toBe(1);
    };

    actions.decrement({ state, commit });
  });

  it('should handle incrementAsync', () => {
    const dispatch = (type, payload) => {
      expect(type).toBe('increment');
      expect(payload).toBeUndefined();
    };

    actions.incrementAsync({ dispatch });
  });

  it('should handle decrementAsync', () => {
    const dispatch = (type, payload) => {
      expect(type).toBe('decrement');
      expect(payload).toBeUndefined();
    };

    actions.decrementAsync({ dispatch });
  });

  it('should handle incrementIfOdd', () => {
    actions.incrementIfOdd({
      dispatch(type, payload) {
        expect(type).toBeUndefined();
        expect(payload).toBeUndefined();
      },
      state: { ...INITIAL },
    });

    actions.incrementIfOdd({
      dispatch(type, payload) {
        expect(type).toBe('increment');
        expect(payload).toBeUndefined();
      },
      state: { ...INITIAL, value: 1 },
    });
  });

  it('should handle decrementIfEven', () => {
    actions.decrementIfEven({
      dispatch(type, payload) {
        expect(type).toBe('decrement');
        expect(payload).toBeUndefined();
      },
      state: { ...INITIAL },
    });

    actions.decrementIfEven({
      dispatch(type, payload) {
        expect(type).toBe('decrement');
        expect(payload).toBeUndefined();
      },
      state: { ...INITIAL },
    });
  });
});
