switch (process.env.JEST_ENV) {
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
        '.*\\.e2e-spec.js$',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.yml$': 'yaml-jest',
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
        '.*\\.e2e-spec.js$',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
    };
    break;

  case 'e2e':
    module.exports = {
      setupTestFrameworkScriptFile: '<rootDir>/tools/setup-e2e.js',
      testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '.*\\.spec.js$',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
    };
    break;

  default:
    module.exports = {};
}
