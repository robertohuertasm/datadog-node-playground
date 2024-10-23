const winston = require('winston');
const transports = [new winston.transports.Console()];

const apiKey = process.env.APIKEY;
const commit = process.env.COMMIT;
const env = process.env.ENV;

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
  level: 'silly',
  format: winston.format.json(),
  transports
});

module.exports = { logger }
