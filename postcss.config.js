module.exports = {
  plugins: {
    'postcss-import': {
      path: ['src/assets/styles'],
    },
    'postcss-preset-env': {
      stage: 0,
      browserslist: 'last 2 versions',
    },
    'postcss-nested': {},
    // 'postcss-remove-unused-css': {},
    cssnano: {},
  },
};
