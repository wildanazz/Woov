const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/auth/google', { target: 'http://localhost:5000' })
  );
  app.use(createProxyMiddleware('/api/*', { target: 'http://localhost:5000' }));
  app.use(
    createProxyMiddleware('/api/auth/confirm/*', {
      target: 'http://localhost:5000',
    })
  );
  app.use(
    createProxyMiddleware('/api/reset/confirm/email', {
      target: 'http://localhost:5000',
    })
  );
  app.use(
    createProxyMiddleware('/api/reset/password/*', {
      target: 'http://localhost:5000',
    })
  );
};
