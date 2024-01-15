const express = require('express');
require('dotenv').config();

const logger = require('./logger').logger;

const log = logger.info;

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  log('DDNP: main entry point called');
  res.send('Hello World!');
});

app.get('/info', (req, res) => {
  logger.info(`DDNP: INFO at ${Date.now()} as number`);
  res.send(`Logging info v3`);
});

app.get('/error', (req, res) => {
  logger.error('DDNP: ERROR');
  res.send('Logging error');
});

app.get('/fatal', (req, res) => {
  logger.error('DDNP: throwing error');
  throw new Error('Fatal Error')
});

app.get('/warn', (req, res) => {
  logger.warn('DDNP: WARN');
  res.send('Logging warn');
});

app.get('/debug', (req, res) => {
  logger.debug('DDNP: DEBUG');
  res.send('Logging debug');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
