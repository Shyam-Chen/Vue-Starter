module.exports = {
  moduleNameMapper: {
    'responses(.*)': '<rootDir>/../mock/responses$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setup.js'],
  testEnvironment: 'node',
  testMatch: [
    process.env.TEST_MATCH === 'spec' && '**/?(*.)+(spec).[jt]s?(x)',
    process.env.TEST_MATCH === 'meas' && '**/?(*.)+(meas).[jt]s?(x)',
  ].filter(Boolean),
  testURL: 'http://localhost',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
