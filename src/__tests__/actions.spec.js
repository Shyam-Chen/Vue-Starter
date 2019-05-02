import { INITIAL } from '../constants';
import actions from '../actions';

describe('actions', () => {
  it('should handle setTheme', () => {
    const state = { ...INITIAL };
    const payload = 'dark';

    expect(state.theme).toMatch('light');

    actions.setTheme({ state }, payload);

    expect(state.theme).toMatch('dark');
  });

  it('should handle setLanguage and initialLanguage', () => {
    Object.defineProperty(window.navigator, 'language', { value: 'zh' });
    sessionStorage.setItem('lang', 'zh');

    const context = {};
    const payload = 'zh';

    actions.setLanguage(context, payload);

    const dispatch = (type, val) => {
      expect(type).toBe('setLanguage');
      expect(val).toBe('zh');
    };

    actions.initialLanguage({ dispatch });
  });

  it('should handle backToHome', () => {
    const state = { ...INITIAL };
    actions.backToHome({ state });
    expect(state.drawer).toBe(false);
  });
});
