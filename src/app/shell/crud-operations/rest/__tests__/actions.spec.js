import { INITIAL } from '../constants';
import actions from '../actions';

jest.mock('axios');

describe('actions', () => {
  it('should handle success', () => {
    const commit = (type, payload) => {
      expect(type).toBe('success');
      expect(payload).toEqual([{ id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' }]);
    };

    const data = [{ id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' }];

    actions.success({ commit }, data);
  });

  it('should handle failure', () => {
    const commit = (type, error) => {
      expect(type).toBe('failure');
      expect(error).toMatchObject(new Error('Error!'));
    };

    const error = new Error('Error!');

    actions.failure({ commit }, error);
  });

  it('should handle addItem (success)', (done) => {
    const dispatch = (type) => {
      expect(type).toBe('searchItem');
      done();
    };

    const state = { ...INITIAL };

    const payload = 'qaz123';

    actions.addItem({ dispatch, state }, payload);
  });

  it('should handle addItem (failure)', () => {

  });

  it('should handle searchItem (success)', (done) => {
    const dispatch = (type, payload) => {
      expect(type).toBe('success');
      expect(payload).toEqual([{ id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' }]);
      done();
    };

    const state = { ...INITIAL };

    const payload = '';

    actions.searchItem({ dispatch, state }, payload);
  });

  it('should handle searchItem (failure)', (done) => {
    const dispatch = (type) => {
      expect(type).toBe('failure');
      done();
    };

    const state = { ...INITIAL };

    const payload = '';

    actions.searchItem({ dispatch, state }, payload);
  });

  it('should handle editItem (success)', (done) => {
    const dispatch = (type) => {
      expect(type).toBe('searchItem');
      done();
    };

    const state = { ...INITIAL };

    const payload = { id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' };

    actions.editItem({ dispatch, state }, payload);
  });

  it('should handle editItem (failure)', () => {

  });

  it('should handle deleteItem (success)', (done) => {
    const dispatch = (type) => {
      expect(type).toBe('searchItem');
      done();
    };

    const state = { ...INITIAL };

    const payload = 'vn3RecDbwMQTjttnluZW';

    actions.deleteItem({ dispatch, state }, payload);
  });

  it('should handle deleteItem (failure)', (done) => {
    const dispatch = (type) => {
      expect(type).toBe('failure');
      done();
    };

    const state = { ...INITIAL };

    const payload = null;

    actions.deleteItem({ dispatch, state }, payload);
  });
});
