module.exports = {
  plugins: {
    'postcss-import': {
      path: ['src/assets/styles'],
    },
    'postcss-url': {},
    'postcss-preset-env': {
      stage: 0,
      browserslist: 'defaults',
    },
    'postcss-nested': {},
    'postcss-remove-unused-css': {},
    cssnano: {},
  },
};
