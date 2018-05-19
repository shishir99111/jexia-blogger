const Boom = require('boom');
const { createDatasetInstance } = rootRequire('utils')

async function logic({ params }) {
  const dataset = await createDatasetInstance(params.dataset);

  let records = await dataset.select().execute();
  return records
}

function handler(req, res, next) {
  logic(req).then((data) => {
    res.json(data);
  }).catch(err => next(err));
}
module.exports = handler;