export default new (class Environment {
  NODE_ENV = process.env.NODE_ENV || 'development';

  SECRET = process.env.SECRET ?? 'jbmpHPLoaV8N0nEpuLxlpT95FYakMPiu';
})();
