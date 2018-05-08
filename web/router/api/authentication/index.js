const authenticationHandler = require('./authenticate.handler');

/**
 * Mounts component specific routes,
 * along with there respective route handlers
 * @param {object} router
 */
module.exports = (router) => {
  router.get('/authentication', authenticationHandler);
  /** future routes
  router.get('/records/all', getRecordsHandler);
  router.get('/records/:id', getRecordByIdHandler);
  router.post('/records', postRecord);  */
};