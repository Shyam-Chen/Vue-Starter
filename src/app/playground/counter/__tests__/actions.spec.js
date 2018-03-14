import actions from '../actions';

jest.useFakeTimers();

describe('actions', () => {
  it('should handle increment', () => {
    const commit = (type, payload) => {
      expect(type).toBe('increment');
      expect(payload).toBeUndefined();
    };

    actions.increment({ commit });
  });

  it('should handle decrement', () => {
    const commit = (type, payload) => {
      expect(type).toBe('decrement');
      expect(payload).toBeUndefined();
    };

    actions.decrement({ commit });
  });

  it('should handle incrementAsync', () => {
    const commit = (type, payload) => {
      expect(type).toBe('increment');
      expect(payload).toBeUndefined();
    };

    actions.incrementAsync({ commit });
  });

  it('should handle decrementAsync', () => {
    const commit = (type, payload) => {
      expect(type).toBe('decrement');
      expect(payload).toBeUndefined();
    };

    actions.decrementAsync({ commit });
  });

  it('should handle incrementIfOdd', () => {
    actions.incrementIfOdd({
      commit(type, payload) {
        expect(type).toBe('increment');
        expect(payload).toBeUndefined();
      },
      state: { value: 1 },
    });

    actions.incrementIfOdd({
      commit(type, payload) {
        expect(type).toBeUndefined();
        expect(payload).toBeUndefined();
      },
      state: { value: 2 },
    });
  });

  it('should handle decrementIfEven', () => {
    actions.decrementIfEven({
      commit(type, payload) {
        expect(type).toBe('decrement');
        expect(payload).toBeUndefined();
      },
      state: { value: 0 },
    });

    actions.decrementIfEven({
      commit(type, payload) {
        expect(type).toBeUndefined();
        expect(payload).toBeUndefined();
      },
      state: { value: 1 },
    });
  });
});
