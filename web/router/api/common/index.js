const getRecordsHandler = require('./getRecords.handler');
const postRecordHandler = require('./postRecord.handler');
const getRecordByIdHandler = require('./getRecordById.handler');

/**
 * Mounts component specific routes,
 * along with there respective route handlers
 * @param {object} router
 */
module.exports = (router) => {
  router.get('/records/:dataset/all', getRecordsHandler);
  router.get('/record/:dataset/:id', getRecordByIdHandler);
  router.post('/records/:dataset', postRecordHandler);
};