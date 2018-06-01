const sdk = require('jexia-sdk-js/node');
const fetch = require('node-fetch');
const { DATASETS } = require('../constants');

const client = sdk.jexiaClient;
const dataOperations = sdk.dataOperations;
const datasets = {};


function getEnvVariables() {
  return {
    // Node Environment Configuration
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,

    // Jexia API Credentials
    JEXIA_APP_URL: process.env.JEXIA_APP_URL,
    JEXIA_API_KEY: process.env.JEXIA_API_KEY,
    JEXIA_SECRET_KEY: process.env.JEXIA_SECRET_KEY,
    JEXIA_PROJECT_ID: process.env.JEXIA_PROJECT_ID,

    // Redis Configuration #########
    // Session expiry set to 1 month for development 60*60*24*30 ###
    REDIS_CONNECTION_URL: process.env.REDIS_CONNECTION_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_UNIX_SOCKET: process.env.REDIS_UNIX_SOCKET,
    REDIS_SESSION_EXPIRY_TIME: process.env.REDIS_SESSION_EXPIRY_TIME,
  };
}

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
  getEnvVariables,
};