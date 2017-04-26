const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/ngl'
  },
  cors: {
    whitelist: ['http://example1.com', 'http://example2.com']
  }
};

module.exports = config;
