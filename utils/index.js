const moment = require('moment');
const sdk = require('jexia-sdk-js/node');
const fetch = require("node-fetch");
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
  }
}

function getJoiErrors(error) {
  if (error && error.isJoi) {
    const errors = error.details.map((error) => {
      return error.message;
    });
    return errors.join(',');
  }
  return '';
};

function getAppName() {
  return require('../package.json').name;
}

function toUTCDate(date) {
  return moment.utc(date).format('DD-MM-YYYYTHH:mm:ss');
}

function sanitizeObj(obj) {
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (typeof val !== 'boolean') {
      if (val) {
        obj[key] = val || '';
      } else {
        delete obj[key];
      }
    }
  });
  return obj;
}

function trimObject(obj) {
  let value;
  Object.keys(obj).forEach((key) => {
    value = obj[key];
    if (value && typeof value === 'string') {
      obj[key] = value.trim();
    } else if (value && value.constructor === Object && typeof value === 'object') {
      obj[key] = trimObject(value);
    }
  });
  return obj;
}

async function createDatasetInstance(datasetName) {
  if (datasets[datasetName]) {
    return datasets[datasetName];
  } else {
    const {
      JEXIA_APP_URL: APP_URL,
      JEXIA_API_KEY: API_KEY,
      JEXIA_SECRET_KEY: SECRET_KEY,
      JEXIA_PROJECT_ID: PROJECT_ID,
    } = getEnvVariables();

    let dataModule = dataOperations();

    let initializedClient = await client(fetch).init({ appUrl: APP_URL, projectID: PROJECT_ID, key: API_KEY, secret: SECRET_KEY }, dataModule);

    let datasetInstance = dataModule.dataset(datasetName);

    datasets[datasetName] = datasetInstance;

    return datasetInstance;
  }
}

function checkIfValidDataset(dataset) {
  return DATASETS.indexOf(dataset) !== -1;
}

function getErrorMessages(error) {
  if (error.details && error.details.length > 0) {
    return error.details.reduce((p, v) => {
      return `${p}${v.message} </br>`;
    }, '');
  }
  return error.message;
}

module.exports = {
  getEnvVariables,
  getJoiErrors,
  getAppName,
  toUTCDate,
  sanitizeObj,
  trimObject,
  createDatasetInstance,
  checkIfValidDataset,
  getErrorMessages,
};