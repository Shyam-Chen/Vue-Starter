import { INITIAL } from '../constants';
import actions from '../actions';

describe('actions', () => {
  it('should handle setTheme', () => {
    const state = { ...INITIAL };
    const payload = 'dark';
    actions.setTheme({ state }, payload);
    expect(localStorage.getItem('theme')).toEqual('dark');
  });

  it('should handle setLanguage', () => {
    const state = {
      ...INITIAL,
      route: {
        path: '/ja/overview',
        params: { lang: 'ja' },
      },
    };

    const payload = 'ja';

    actions.setLanguage({ state }, payload);
  });

  it('should handle initialLanguage', () => {
    const context = {
      state: {
        ...INITIAL,
        route: { params: { lang: 'ja' } },
      },
      dispatch(type, val) {
        expect(type).toBe('setLanguage');
        expect(val).toBe('ja');
      },
    };

    actions.initialLanguage(context);
  });

  it('should handle backToHome', () => {
    const state = { ...INITIAL };
    actions.backToHome({ state });
    expect(state.drawer).toBe(false);
  });
});
