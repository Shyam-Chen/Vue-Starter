const env = require('./env');

switch (process.env.JEST_ENV) {
  case 'unit':
    module.exports = {
      moduleFileExtensions: ['js', 'vue'],
      moduleNameMapper: {
        '~(.*)': '<rootDir>/src$1',
        '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      },
      setupFilesAfterEnv: ['<rootDir>/src/unit.js'],
      snapshotSerializers: ['jest-serializer-vue'],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/.flow-typed',
        '.*\\.e2e-spec.js$',
      ],
      testURL: `http://${env.HOST_NAME}/`,
      transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      },
      transformIgnorePatterns: [
        'node_modules/(?!@babel|vuetify)',
      ],
    };
    break;

  case 'e2e':
    module.exports = {
      setupFilesAfterEnv: ['<rootDir>/src/e2e.js'],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/.flow-typed',
        '.*\\.spec.js$',
      ],
      testURL: `http://${env.HOST_NAME}/`,
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
    };
    break;

  default:
    module.exports = {};
}
