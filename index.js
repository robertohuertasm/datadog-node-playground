const express = require('express');
const winston = require('winston');
require('dotenv').config();

const apiKey = process.env.APIKEY;
const commit = process.env.COMMIT;
const env = process.env.ENV;

const transports = [new winston.transports.Console()];

if (apiKey) {
  console.log('Sending logs to Datadog');
  // https://docs.datadoghq.com/api/latest/logs/
  let path = `/api/v2/logs?dd-api-key=${apiKey}&ddsource=nodejs&service=datadog-node-playground&ddtags=git.repository_url:github.com/robertohuertasm/datadog-node-playground,env:${env ?? 'development'}`;

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
