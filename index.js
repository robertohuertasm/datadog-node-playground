const express = require('express');
require('dotenv').config();

const winstonLogger = require('./logger').logger;
const log = winstonLogger.info;

const { pino } = require('pino');
const pinoLogger = pino();
pinoLogger.info('hello from pino');

const bunyan = require('bunyan');
const bunyanLogger = bunyan.createLogger({ name: 'bunyanLogger' });
bunyanLogger.info('hello from bunyan');

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


// const log = pinoLogger.info;
// log('INITIAL LOG');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  log('DDNP: main entry point called');
  res.send('Hello World!');
});

app.get('/info', (req, res) => {
  winstonLogger.info(`DDNP: INFO at ${Date.now()} as number`);
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
