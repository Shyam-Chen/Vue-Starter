import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { API_LIST, INITIAL } from '../constants';
import actions from '../actions';

const mockAxios = new AxiosMockAdapter(axios);

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

  it('should handle addItem (success)', async () => {
    mockAxios.onPost(API_LIST).reply(200, { message: 'Data saved.' });

    const dispatch = type => {
      expect(type).toBe('searchItem');
    };
    const state = { ...INITIAL };
    const payload = 'qaz123';

    await actions.addItem({ dispatch, state }, payload);
  });

  it('should handle addItem (failure)', async () => {
    const dispatch = type => {
      expect(type).toBe('failure');
    };
    const state = { ...INITIAL };
    const payload = new Error('Error!');

    await actions.addItem({ dispatch, state }, payload);
  });

  it('should handle addItem (undefined)', async () => {
    const dispatch = () => {};
    const state = { ...INITIAL };
    const payload = '';

    const result = await actions.addItem({ dispatch, state }, payload);
    expect(result).toBeUndefined();
  });

  it('should handle searchItem (success)', async () => {
    mockAxios
      .onGet(API_LIST)
      .reply(200, { data: [{ id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' }] });

    const dispatch = (type, payload) => {
      expect(type).toBe('success');
      expect(payload).toEqual({ data: [{ id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' }] });
    };

    const state = { ...INITIAL };
    const payload = '';

    await actions.searchItem({ dispatch, state }, payload);
  });

  it('should handle searchItem (failure)', async () => {
    const dispatch = type => {
      expect(type).toBe('failure');
    };
    const state = { ...INITIAL };
    const payload = '';

    await actions.searchItem({ dispatch, state }, payload);
  });

  it('should handle editItem (success)', async () => {
    mockAxios.onPut(`${API_LIST}/vn3RecDbwMQTjttnluZW`).reply(200, { message: 'Data updated.' });

    const dispatch = type => {
      expect(type).toBe('searchItem');
    };
    const state = { ...INITIAL };
    const payload = { id: 'vn3RecDbwMQTjttnluZW', text: 'zxc123' };

    await actions.editItem({ dispatch, state }, payload);
  });

  it('should handle editItem (failure)', async () => {
    const dispatch = type => {
      expect(type).toBe('failure');
    };
    const state = { ...INITIAL };
    const payload = { id: 'vn3RecDbwMQTjttnluZW', text: new Error('Error!') };

    await actions.editItem({ dispatch, state }, payload);
  });

  it('should handle deleteItem (success)', async () => {
    mockAxios.onDelete(`${API_LIST}/vn3RecDbwMQTjttnluZW`).reply(200, { message: 'Data deleted.' });

    const dispatch = type => {
      expect(type).toBe('searchItem');
    };
    const state = { ...INITIAL };
    const payload = 'vn3RecDbwMQTjttnluZW';

    await actions.deleteItem({ dispatch, state }, payload);
  });

  it('should handle deleteItem (failure)', async () => {
    const dispatch = type => {
      expect(type).toBe('failure');
    };
    const state = { ...INITIAL };
    const payload = null;

    await actions.deleteItem({ dispatch, state }, payload);
  });
});
