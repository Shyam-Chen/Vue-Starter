module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src$1',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test.js'],
  snapshotSerializers: ['jest-serializer-vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
};
