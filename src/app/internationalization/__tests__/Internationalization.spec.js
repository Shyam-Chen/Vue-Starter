import { createLocalVue, shallow } from '@vue/test-utils';
import I18n from 'vue-i18n';

import Internationalization from '../Internationalization';
import messages from '../_languages/en.yml';

const localVue = createLocalVue();

localVue.use(I18n);

describe('Internationalization', () => {
  let [wrapper, i18n] = [];

  beforeEach(() => {
    i18n = new I18n({
      locale: 'en',
      messages,
    });

    wrapper = shallow(Internationalization, { localVue, i18n });
  });

  it('should render initial component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
