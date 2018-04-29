const { generateCorellationId } = rootRequire('utils');

function requestLogger(router) {
  router.use((req, res, next) => {
    // logger.info(`--> ${req.method} ${req.path}`);
    if (!req.headers['X-INSTA-CORRELATION-ID']) {
      req.headers['X-INSTA-CORRELATION-ID'] = generateCorellationId();
    }
    // appending correlation id
    const message = `Correlation id: ${req.headers['X-INSTA-CORRELATION-ID']}`;

    logger.info(message);
    next();
  });
}

module.exports = requestLogger;