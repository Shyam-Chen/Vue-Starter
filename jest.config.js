switch (process.env.TEST_ENV) {
  case 'app':
    module.exports = {
      moduleFileExtensions: ['js', 'vue'],
      moduleNameMapper: {
        '~(.*)': '<rootDir>/src/app$1',
      },
      setupTestFrameworkScriptFile: '<rootDir>/tools/setup-app.js',
      snapshotSerializers: [
        '<rootDir>/node_modules/jest-serializer-vue',
      ],
      testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '.*\\.e2e.*\\.(js)$',
      ],
      transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
      },
    };
    break;

  case 'api':
    module.exports = {
      moduleNameMapper: {
        '~(.*)': '<rootDir>/src/api$1',
      },
      setupTestFrameworkScriptFile: '<rootDir>/tools/setup-api.js',
      testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '.*\\.e2e.*\\.(js)$',
      ],
      transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
      },
    };
    break;

  default:
    module.exports = {
      transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
      },
    };
}
