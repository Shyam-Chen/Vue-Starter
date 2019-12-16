import { createLocalVue, shallowMount } from '@vue/test-utils';
// import I18n from 'vue-i18n';

import About from '../About';
// import en from '../_languages/en';

const localVue = createLocalVue();

// localVue.use(I18n);

describe('About', () => {
  let [wrapper/* , i18n */] = [];

  beforeEach(() => {
    // i18n = new I18n({
    //   locale: 'en',
    //   messages: { en: { home: en } },
    // });

    wrapper = shallowMount(About, {
      localVue,
      // i18n,
      mocks: {},
    });
  });

  it('should render an initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
