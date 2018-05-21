import { createLocalVue, shallowMount } from '@vue/test-utils';
import I18n from 'vue-i18n';

import Internationalization from '../Internationalization';
import en from '../_languages/en';

const localVue = createLocalVue();

localVue.use(I18n);

describe('Internationalization', () => {
  let [wrapper, i18n] = [];

  beforeEach(() => {
    i18n = new I18n({
      locale: 'en',
      messages: { en },
    });

    wrapper = shallowMount(Internationalization, { localVue, i18n });
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
