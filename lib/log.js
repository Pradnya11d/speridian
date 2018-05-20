// ./lib/log.js
var winston = require('winston');
const fs = require('fs');
var config = require('../config/serverconfig').get(process.env.NODE_ENV);

var logDir = config.log.directory;
var fileName = config.log.file;

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

winston.emitErrs = true;
const tsFormat = () => (new Date()).toLocaleTimeString();
var logger;
	logger = new winston.Logger({
		transports: [
			new (winston.transports.Console)({
      			timestamp: tsFormat,
      			handleExceptions: true,
      			json: false,
      			colorize: true,
      			level: config.log.level
			})
		],
		exitOnError: false
	});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
