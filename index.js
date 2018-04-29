const path = require('path');
/**
 * Bootstrap application file
 *
 * This is the main entry point of the application.
 * It will load configurations, initialize the app and start the express server
 */

require('dotenv').config({ path: path.join(__dirname, '/.env') });

// Set globals
require('./globals');

// Start server
const { appServer } = require('./web/server');

if (process.env.INITIALIZE_WORKER === 'true') {
  initializeWorker().then((emitEvent) => {
    global.emitEvent = emitEvent;
  }).catch(e => {
    logger.error(`Error Starting workers ${e.message}`);
    logger.error('Shutting Down Process');
    process.exit(0);
  });
} else {
  logger.info(`Workers not running for ${process.env.NODE_ENV}`);
}
require('./gracefullyShutDown')(appServer);