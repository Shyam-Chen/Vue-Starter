import { test, expect } from 'vitest';
import { render } from '@testing-library/vue';

import Registry from '../Registry.vue';

test('Buttons', () => {
  const { html } = render(Registry);
  expect(html()).toMatchSnapshot();
});
