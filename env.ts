export default new (class Environment {
  // ./mock/requests
  MOCK_API = process.env.MOCK_API ?? 'http://localhost:3000';
})();
