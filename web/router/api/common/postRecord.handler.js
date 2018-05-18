const Boom = require('boom');
const { createDatasetInstance } = rootRequire('utils')

async function logic({ body, params }) {
  const dataset = await createDatasetInstance(params.dataset);

  return (await commentDataset.insert(body).execute());
}

function handler(req, res, next) {
  logic(req).then((data) => {
    res.json(data);
  }).catch(err => next(err));
}
module.exports = handler;