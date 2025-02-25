const express = require('express');
require('dotenv').config();

const loggers = require('./logger');

const winstonLogger = loggers.winstonLogger;
const log = winstonLogger.info;

const pinoLogger = loggers.pinoLogger;
pinoLogger.info('hello from pino');

const bunyan = require('bunyan');
const bunyanLogger = bunyan.createLogger({ name: 'bunyanLogger' });
bunyanLogger.info('hello from bunyan');
bunyanLogger.debug('this is a debug item wtf');

const log4js = require('log4js');
log4js.addLayout('json', function (config) {
  return function (logEvent) { return JSON.stringify(logEvent) + config.separator; }
});

log4js.configure({
  appenders: {
    out: { type: 'stdout', layout: { type: 'json', separator: ',' } }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' }
  }
});
const log4jsLogger = log4js.getLogger();
log4jsLogger.level = 'debug';
log4jsLogger.info('Hello from log4js');

// const ddLogs = require('@datadog/browser-logs').datadogLogs;

// ddLogs.init({
//   clientToken: 'client-token',
//   site: 'app.datadoghq.com',
//   forwardErrorsToLogs: false,
//   forwardConsoleLogs: false,
//   service: 'datadog-node-playground',
//   env: 'production',
// });

// ddLogs.logger.debug('message');
//a

// const log = pinoLogger.info;
// log('INITIAL LOG');

const app = express();
const port = 8081;

app.get('/', (req, res) => {
  const wtf = 'afasdf';
  log('DDNP: main entry point called' + wtf + ' hello');
  log('DDNP: main entry point called');
  log('{}');

  log('{} hola');
  log(`this is what${'a'}ever`);

  log(`${Date.now()} ${Date.now()}`);

  res.send('Hello World!');
});

app.get('/info', (req, res) => {
  winstonLogger.info(`DDNP: INFO at ${Date.now()} as number`);
  // winstonLogger.info(`DDNP: INFO at ${Date.now() + `)`} as number`);
  // winstonLogger.http(`http message`);
  winstonLogger.log('error', 'Error with log message')
  winstonLogger.info('Error with log message');
  winstonLogger.log('info', 'Error with log message');
  // winstonLogger.verbose(`verbose message`);
  // winstonLogger.silly(`silly message`);

  pinoLogger.fatal('fatal');
  pinoLogger.error('error');
  pinoLogger.warn('warn');
  pinoLogger.info('info');
  pinoLogger.debug('debug');
  pinoLogger.trace('trace');

  res.send(`Logging info v3`);

});

app.get('/error', (req, res) => {
  winstonLogger.error('DDNP: ERROR');
  res.send('Logging error');
});

app.get('/fatal', (req, res) => {
  winstonLogger.error('DDNP: throwing error');
  throw new Error('Fatal Error')
});

app.get('/warn', (req, res) => {
  winstonLogger.warn(`DDNP: WARN
  in 2 lines`);
  res.send('Logging warn');
});

app.get('/debug', (req, res) => {
  winstonLogger.debug(`DDNP: DEBUG 
  in 2 lines`);
  res.send('Logging debug');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
