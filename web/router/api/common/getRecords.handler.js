const Boom = require('boom');

const { createDatasetInstance } = rootRequire('utils');

async function logic({ params }) {
  try {
    const dataset = await createDatasetInstance(params.dataset);

    const records = await dataset.select().execute();
    return records;
  } catch (e) {
    throw e;
  }
}

function handler(req, res, next) {
  logic(req).then((data) => {
    res.json(data);
  }).catch(err => next(err));
}
module.exports = handler;