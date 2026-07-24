/**
 * VENZO-SERVER - Core System Logging Engine (Pino Setup)
 */
const pino = require('pino');

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        }
    }
});

module.exports = logger;
