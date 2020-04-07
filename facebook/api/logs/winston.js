const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.label({ label: 'notion' }),
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ message, label }) => {
          return `[${label}] ${message}`;
        }),
      )
    }),
    new winston.transports.File({
      filename: './logs/info.logs',
      level: 'info',
      format: winston.format.combine(
        winston.format.label({ label: 'info' }),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, label, timestamp }) => {
          const time = timestamp.split('T');
          return `(${time[0]}) ${time[1]} [${label}] ${level}: ${message}`;
        })
      )
    }),
    new winston.transports.File({
      filename: './logs/error.logs',
      level: 'error',
      format: winston.format.combine(
        winston.format.label({ label: 'error' }),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, label, timestamp }) => {
          const time = timestamp.split('T');
          return `(${time[0]}) ${time[1]} [${label}] ${level}: ${message}`;
        })
      )
    })
  ]
});

module.exports = logger;
