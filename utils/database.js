const sdk = require('jexia-sdk-js/node');
const fetch = require("node-fetch");
const client = sdk.jexiaClient;
const dataOperations = sdk.dataOperations;
const datasets = {};

async function createDatasetInstance(datasetName) {
  if (datasets[datasetName]) {
    return datasets[datasetName];
  }
  const {
    JEXIA_APP_URL: APP_URL,
    JEXIA_API_KEY: API_KEY,
    JEXIA_SECRET_KEY: SECRET_KEY,
    JEXIA_PROJECT_ID: PROJECT_ID,
  } = getEnvVariables();

  const dataModule = dataOperations();

  const initializedClient = await client(fetch).init({ appUrl: APP_URL, projectID: PROJECT_ID, key: API_KEY, secret: SECRET_KEY }, dataModule);

  const datasetInstance = dataModule.dataset(datasetName);

  datasets[datasetName] = datasetInstance;

  return datasetInstance;
}

function checkIfValidDataset(dataset) {
  return DATASETS.indexOf(dataset) !== -1;
}

module.exports = {
  createDatasetInstance,
  checkIfValidDataset,
}