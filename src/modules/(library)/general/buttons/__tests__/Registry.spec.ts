import { test, expect } from 'vitest';
import { render } from '@testing-library/vue';

import { router } from '~/plugins/router';

import Registry from '../Registry.vue';

test('Buttons', () => {
  const { html } = render(Registry, { global: { plugins: [router] } });
  expect(html()).toMatchSnapshot();
});
