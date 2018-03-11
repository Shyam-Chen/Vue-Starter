module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src/app$1',
  },
  setupTestFrameworkScriptFile: '<rootDir>/tools/setup-test.js',
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
};
