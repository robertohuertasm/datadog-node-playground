const express = require('express');
const winston = require('winston');
require('dotenv').config();

const apiKey = process.env.APIKEY;
const commit = process.env.COMMIT;

const transports = [new winston.transports.Console()];

if (apiKey) {
  console.log('Sending logs to Datadog');
  // https://docs.datadoghq.com/api/latest/logs/
  let path = `/api/v2/logs?dd-api-key=${apiKey}&ddsource=nodejs&service=datadog-node-playground&ddtags=git.repository_url:github.com/robertohuertasm/datadog-node-playground,env:development`;

  if (commit) {
    path += `,git.commit.sha:${commit}`;
  }

  const httpTransportOptions = {
    host: 'http-intake.logs.datadoghq.com',
    path,
    ssl: true
  };
  transports.push(new winston.transports.Http(httpTransportOptions))
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports
});

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  logger.info('main entry point called');
  res.send('Hello World!');
});

app.get('/info', (req, res) => {
  logger.info('INFO');
  res.send('Logging info v3');
});

app.get('/error', (req, res) => {
  logger.error('ERROR');
  res.send('Logging error');
});

app.get('/fatal', (req, res) => {
  logger.error('throwing error');
  throw new Error('Fatal Error')
});

app.get('/warn', (req, res) => {
  logger.warn('WARN');
  res.send('Logging warn');
});

app.get('/debug', (req, res) => {
  logger.debug('DEBUG');
  res.send('Logging debug');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
