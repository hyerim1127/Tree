module.exports = function(app) {
    app.use(
      '/',
      createProxyMiddleware({
        target: 'http://localhost:8081',
        changeOrigin: true,
      })
    );
  };