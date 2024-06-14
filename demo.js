const express = require('express');
require('dotenv').config();

const winstonLogger = require('./logger').logger;
const log = winstonLogger.info;

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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
