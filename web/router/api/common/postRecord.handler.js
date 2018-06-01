const Boom = require('boom');
const Joi = require('joi');

const { createDatasetInstance, checkIfValidDataset, getErrorMessages } = rootRequire('utils');
const { postUserSchema, postBlogSchema, postCommentSchema } = rootRequire('joi');
// const { DATASETS } = rootRequire('constants');

const schemaSelection = function(dataset) {
  switch (dataset) {
    case 'comment':
      return postCommentSchema;
    case 'blog':
      return postBlogSchema;
    case 'user':
      return postUserSchema;
    default:
      return Boom.badRequest('Not a valid Dataset');
  }
};

async function logic({ body, params }) {
  try {
    if (!checkIfValidDataset(params.dataset)) Boom.badRequest('Invalid Dataset');

    const { error } = Joi.validate(body, schemaSelection(params.dataset), { abortEarly: false });
    if (error) throw Boom.badRequest(getErrorMessages(error));

    const dataset = await createDatasetInstance(params.dataset);
    const _body = Array.isArray(body) ? body : [body];
    return dataset.insert(_body).execute();
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