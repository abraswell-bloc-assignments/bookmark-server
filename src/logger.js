
// Add Winston to log errors to log file
// so errors are not public-facing but are 
const winston = require('winston')
const { NODE_ENV } = require('./config')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
})

if (!['production', 'test'].includes(NODE_ENV)) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger