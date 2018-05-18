const Boom = require('boom');
const { createDatasetInstance } = rootRequire('utils')

async function logic({ params }) {
  const dataset = await createDatasetInstance(params.dataset_name);

  let records = await dataset.select().where(field('id').isEqualTo(params.id)).execute();
  return records
}

function handler(req, res, next) {
  logic(req).then((data) => {
    res.json(data);
  }).catch(err => next(err));
}
module.exports = handler;