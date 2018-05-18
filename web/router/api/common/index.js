const getRecordsHandler = require('./getRecords.handler');
const postRecord = require('./postRecord.handler');
const getRecordById = require('./getRecordById.handler');

/**
 * Mounts component specific routes,
 * along with there respective route handlers
 * @param {object} router
 */
module.exports = (router) => {
  router.get('/records/:dataset/all', getRecordsHandler);
  router.get('/records/:dataset/:id', getRecordByIdHandler);
  router.post('/records/:dataset', postRecord);
};