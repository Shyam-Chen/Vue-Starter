import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import webfontloader from 'webfontloader';
import LRU from 'lru-cache';

Vue.use(Vuetify);

webfontloader.load({
  google: {
    families: [
      'Roboto:100,300,400,500,700,900',
      // 'Roboto+Mono:500',
      // 'Material+Icons',
    ],
  },
  // custom: {
  //   families: [
  //     'Material Design Icons', // @mdi/js
  //     'Font Awesome 5',
  //   ],
  //   urls: [
  //     'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css',
  //     'https://use.fontawesome.com/releases/v5.0.8/css/all.css',
  //   ],
  // },
});

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
