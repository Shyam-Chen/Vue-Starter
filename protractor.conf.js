const babel = require('babel-register');
const { SpecReporter } = require('jasmine-spec-reporter');

const { TEST_PORT } = require('./gulpfile.babel');

exports.config = {
  directConnect: true,
  specs: [
    'src/**/*.e2e-spec.js'
  ],
  exclude: [],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--no-sandbox', '--headless', '--disable-gpu', '--window-size=1280,720']
    }
  },
  baseUrl: `http://localhost:${TEST_PORT}`,
  onPrepare() {
    babel();
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    browser.ignoreSynchronization = true;
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    print() {}
  }
};
