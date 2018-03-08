module.exports = {
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src/app$1',
  },
  moduleFileExtensions: ['js', 'vue'],
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
};
