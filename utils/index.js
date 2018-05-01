const moment = require('moment');

function getEvnVariables() {
  return {
    // Node Environment Configuration
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,

    // Jexia API Credentials
    JEXIA_APP_URL: process.env.JEXIA_APP_URL,
    JEXIA_API_KEY: process.env.JEXIA_API_KEY,
    JEXIA_SECRET_KEY: process.env.JEXIA_SECRET_KEY,

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

module.exports = {
  getEvnVariables,
  getJoiErrors,
  getAppName,
  toUTCDate,
  sanitizeObj,
  trimObject,
};