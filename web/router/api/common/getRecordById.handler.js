const Boom = require('boom');

const { createDatasetInstance } = rootRequire('utils');
const { field } = require('jexia-sdk-js');

async function logic({ params }) {
  try {
    const dataset = await createDatasetInstance(params.dataset);

    const records = await dataset.select().where(field('id').isEqualTo(params.id)).execute();
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