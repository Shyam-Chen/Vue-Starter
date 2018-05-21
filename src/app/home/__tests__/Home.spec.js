import { createLocalVue, shallowMount } from '@vue/test-utils';
import I18n from 'vue-i18n';

import Home from '../Home';
import en from '../_languages/en';

const localVue = createLocalVue();

localVue.use(I18n);

describe('Home', () => {
  let [wrapper, i18n] = [];

  beforeEach(() => {
    i18n = new I18n({
      locale: 'en',
      messages: { en: { home: en } },
    });

    wrapper = shallowMount(Home, { localVue, i18n });
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
