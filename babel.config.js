module.exports = (api) => {
  api.cache(true);

  return {
    env: {
      app: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
              corejs: '3',
              shippedProposals: true,
              targets: '> 0.25%, not dead',
            },
          ],
          '@babel/preset-flow',
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          '@babel/plugin-syntax-dynamic-import',
          'lodash',
        ],
      },
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
              corejs: '3',
              shippedProposals: true,
              targets: {
                node: 'current',
              },
            },
          ],
          '@babel/preset-flow',
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          '@babel/plugin-syntax-dynamic-import',
          'dynamic-import-node',
          'lodash',
        ],
      },
    },
  };
};
