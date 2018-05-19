const Boom = require('boom');
const { createDatasetInstance, checkIfValidDataset } = rootRequire('utils');
const { postCommentSchema } = rootRequire('joi');
const { DATASETS } = rootRequire('constants');

async function logic({ body, params }) {
  if (!checkIfValidDataset(params.dataset)) Boom.badRequest('Invalid Dataset');

  // const { error } = Joi.validate(body, postSchema, { abortEarly: false });
  // if (error) throw Boom.badRequest(getErrorMessages(error));

  const dataset = await createDatasetInstance(params.dataset);
  const _body = Array.isArray(body) ? body : [body];
  return (await dataset.insert(_body).execute());
}

function handler(req, res, next) {
  logic(req).then((data) => {
    res.json(data);
  }).catch(err => next(err));
}
module.exports = handler;