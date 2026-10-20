const app = require('./app');

if (require.main === module) {
  app.startServer();
} else {
  app.locals.initialization = app.initializeApplication();
  app.locals.initialization.catch(err => {
    console.error('Failed to initialize application:', err.message);
    process.exit(1);
  });
}

module.exports = app;
