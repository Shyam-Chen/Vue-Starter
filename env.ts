export default new (class Environment {
  API_URL = process.env.API_URL ?? 'http://localhost:3000';
})();
