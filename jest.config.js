const env = require('./env');

switch (process.env.JEST_ENV) {
  case 'app':
    module.exports = {
      coveragePathIgnorePatterns: ['/node_modules/', '/tools/'],
      moduleFileExtensions: ['js', 'vue'],
      moduleNameMapper: {
        '~(.*)': '<rootDir>/src$1',
        '^vuetify/lib$': 'vuetify',
        '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      },
      setupFilesAfterEnv: ['<rootDir>/tools/setup-app.js'],
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
    };
    break;

  case 'e2e':
    module.exports = {
      setupFilesAfterEnv: ['<rootDir>/tools/setup-e2e.js'],
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
