const functions = require('firebase-functions');
const admin = require('firebase-admin');

functions.config = jest.fn(() => ({
  firebase: {
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://not-a-project.firebaseio.com',
    storageBucket: 'not-a-project.appspot.com',
  },
}));

const { helloWorld } = require('../');

describe('helloWorld', () => {
  it('returns a string', (done) => {
    const mockRequest = {
      method: 'GET',
    };

    const mockResponse = {
      status: (code) => {
        expect(code).toEqual(200);

        return {
          send: jest.fn((message) => {
            expect(message).toBe('Hello, World!');
            done();
          }),
        };
      },
    };

    helloWorld(mockRequest, mockResponse);
  });
});
