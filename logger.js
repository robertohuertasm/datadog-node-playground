const winston = require('winston');
const pino = require('pino');
const pinoDatadog = require('pino-datadog');
const pinoms = require('pino-multi-stream');

// env vars
const apiKey = process.env.APIKEY;
const commit = process.env.COMMIT;
const env = process.env.ENV;

const writeStream = pinoDatadog.createWriteStreamSync({
  apiKey,
  ddsource: 'nodejs',
  service: 'datadog-node-playground',
  ddtags: `git.repository_url:github.com/robertohuertasm/datadog-node-playground,env:${env ?? 'development'}`,
  // hostname: 'http-intake.logs.datadoghq.com'
});
const winstonTransports = [new winston.transports.Console()];


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

winstonTransports.push(new winston.transports.Http(httpTransportOptions));

let pinoLogger = pinoms({ level: 'trace', streams: [{ stream: writeStream, level: 'trace' }] });

// pinoLogger = pino({
//   base: null,
//   level: 'info',

// }, pinoDatadog({
//   apiKey,
//   ddsource: 'nodejs',
//   service: 'datadog-node-playground',
//   ddtags: `git.repository_url:github.com/robertohuertasm/datadog-node-playground,env:${env ?? 'development'}`
// }));


const winstonLogger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  transports: winstonTransports
});

module.exports = { winstonLogger, pinoLogger }
