import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import LRU from 'lru-cache';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark: localStorage.getItem('theme') === 'dark' || false,
    themes: {
      light: {
        primary: colors.blue.darken1,
        secondary: colors.blue.lighten1,
        accent: colors.pink,
      },
      dark: {
        primary: colors.blue.darken1,
        secondary: colors.blue.lighten1,
        accent: colors.pink,
      },
    },
    options: {
      minifyTheme(css) {
        return css.replace(/[\r\n|\r|\n]/g, '');
      },
      themeCache: new LRU({
        max: 10,
        maxAge: 60 * 60 * 1000,
      }),
    },
  },
});
