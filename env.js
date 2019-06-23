function Environments() {
  this.NODE_ENV = process.env.NODE_ENV || 'development';

  this.HOST_NAME = process.env.HOST_NAME || '0.0.0.0';
  this.SITE_PORT = process.env.SITE_PORT || 8000;
  this.SITE_URL =
    process.env.SITE_URL || `http://${this.HOST_NAME}:${this.SITE_PORT}`;
  this.APP_BASE = process.env.APP_BASE || '/';

  this.GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS || 'UA-84381641-2';
  this.SENTRY_DSN = process.env.SENTRY_DSN || null;
}

module.exports = new Environments();
