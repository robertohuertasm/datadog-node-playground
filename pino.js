import { pino } from 'pino';
const logger = pino();
const info = logger.info;
info('wtf');
logger.info('wtf');
logger.debug('wtf');
