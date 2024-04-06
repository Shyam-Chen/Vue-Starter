import theme from 'vitepress/theme';

import './vars.css';

export default {
  ...theme,
  enhanceApp(ctx) {
    // ctx.app.use(_);
  },
} as typeof theme;
