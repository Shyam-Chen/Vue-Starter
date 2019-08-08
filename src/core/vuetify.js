import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#1E88E5', // blue, darken-1
        secondary: '#42A5F5', // blue, lighten-1
        accent: '#E91E63', // pink
        // primary: colors.blue.darken1,
        // secondary: colors.blue.lighten1,
        // accent: colors.pink,
      },
      dark: {
        primary: '#1E88E5', // blue, darken-1
        secondary: '#42A5F5', // blue, lighten-1
        accent: '#E91E63', // pink
        // primary: colors.blue.darken1,
        // secondary: colors.blue.lighten1,
        // accent: colors.pink,
      },
    },
  },
});
