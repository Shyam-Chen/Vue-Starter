module.exports = {
  moduleNameMapper: {
    'responses(.*)': '<rootDir>/../mock/responses$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setup.js'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test|meas).[jt]s?(x)'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
