function Environment() {
  this.API_URL = process.env.API_URL || 'http://localhost:3000';
}

export default new Environment();
