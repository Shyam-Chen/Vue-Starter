import { test, expect } from 'vitest';
import { render } from '@testing-library/vue';

import { stateSymbol, createState } from '../store';
import Counter from '../Counter.vue';

test('Counter', () => {
  const { html } = render(Counter, { global: { provide: { [stateSymbol]: createState } } });
  expect(html()).toMatchSnapshot();
});
