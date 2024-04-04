import type { VueWrapper } from '@vue/test-utils';
import { mount, flushPromises } from '@vue/test-utils';
import * as xui from '@x/ui';
import todos from 'mock/todos/response';

import localer from '~/plugins/localer';
import router from '~/plugins/router';

import Page from '../+page.vue';
import useStore from '../store';

let wrapper: VueWrapper;

afterEach(() => {
  wrapper.unmount();
});

test('initial', async () => {
  vi.spyOn(xui, 'request').mockImplementation((url, { method }: any): any => {
    if (url === '/todos' && method === 'POST') {
      return { _data: todos.basic, status: 200 };
    }
  });

  wrapper = mount(Page, { global: { plugins: [router, localer] } });

  await flushPromises();

  const store = useStore();
  expect(store.state.todosRows).toStrictEqual(todos.basic.result);
  expect(store.state.todosCount).toStrictEqual(todos.basic.total);
});
