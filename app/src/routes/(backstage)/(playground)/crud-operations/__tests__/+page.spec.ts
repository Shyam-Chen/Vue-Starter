import type { VueWrapper } from '@vue/test-utils';
import { mount, flushPromises } from '@vue/test-utils';
import * as vueRouter from 'vue-router';
import * as xui from '@x/ui';
import todos from 'mock/todos/response';

import localer from '~/plugins/localer';
import router from '~/plugins/router';

import Page from '../+page.vue';
import useStore from '../store';

let wrapper: VueWrapper;

afterEach(() => {
  wrapper.unmount();
  vi.clearAllMocks();
});

test('initial', async () => {
  vi.spyOn(xui, 'request').mockImplementation((url, { method }: any): any => {
    if (url === '/todos' && method === 'POST') {
      return { _data: todos.basic, status: 200 };
    }
  });

  vi.mock('vue-router', async (importOriginal) => {
    const actual = await importOriginal<typeof vueRouter>();

    return {
      ...actual,
      onBeforeRouteLeave: vi.fn(),
    };
  });

  wrapper = mount(Page, { global: { plugins: [router, localer] } });

  await flushPromises();

  const store = useStore();
  expect(store.state.todosRows).toStrictEqual(todos.basic.result);
  expect(store.state.todosCount).toStrictEqual(todos.basic.total);
});
