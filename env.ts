export default new (class Environment {
  // ./mock/requests (proxy mock api with vite)
  MOCK_API = process.env.MOCK_API ?? 'http://localhost:3000';

  API_URL = process.env.API_URL || '';
})();
