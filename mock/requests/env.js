function Environment() {
  this.NODE_ENV = process.env.NODE_ENV || 'development';

  this.LISTEN_HOST = process.env.LISTEN_HOST || '0.0.0.0';
  this.LISTEN_PORT = process.env.LISTEN_PORT || 3000;
}

export default new Environment();
