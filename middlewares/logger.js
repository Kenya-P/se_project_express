const winston = require('winston');
const expressWinston = require('express-winston');

// create the custom formatter
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

// create a request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

// create an error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",})
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};