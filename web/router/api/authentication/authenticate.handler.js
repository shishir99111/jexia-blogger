const sdk = require('jexia-sdk-js/node');
const fetch = require("node-fetch");
const Boom = require('boom');

async function logic() {
  const APP_URL = process.env.JEXIA_APP_URL;
  const API_KEY = process.env.JEXIA_API_KEY;
  const SECRET_KEY = process.env.JEXIA_SECRET_KEY;
  let dataModule = sdk.dataOperations();

  console.log(dataModule);

  let initializedClientPromise = sdk.jexiaClient(fetch).init({ appUrl: APP_URL, projectID: 'b6ba8a4f-2113-44cd-a946-1e4fa6bed0e4', key: API_KEY, secret: SECRET_KEY });
  initializedClientPromise.then((initializedClient) => {
    let comments = dataModule.dataset("comments");
    let selectQuery = postsDataset.select();
  }).catch((e) => {
    throw Boom.badRequest(e.message);
  });
}

function handler(req, res, next) {
  logic(req).then((data) => {
    res.json(data);
  }).catch(err => next(err));
}
module.exports = handler;