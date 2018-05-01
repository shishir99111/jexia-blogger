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

require('./gracefullyShutDown')(appServer);