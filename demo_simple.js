const express = require('express');
require('dotenv').config();

const winstonLogger = require('./logger').winstonLogger;
const log = winstonLogger.info;

const app = express();
const port = 8081;

app.get('/', (req, res) => {
  const var1 = 'var1Value';
  const f = () => {
    console.log('a');
  };

  const o = {
    prop: 'someValue'
  };


  // simple
  log('simple text');
  log('ERROR', 'this is a log');

  // interpolation
  winstonLogger.info(`Interpolation at ${Date.now()}. The dot should not be present`);
  winstonLogger.info(`Multiple lines ${Date.now()}
    with interpolation`);
  winstonLogger.info(`nested interpolation ${`this is a valid string ${Date.now()}`}`);
  winstonLogger.info(`nested interpolation ${`string${Date.now()} should disappear`} somehow`);

  // concatenation
  winstonLogger.info(`hello world` + 1 + 1);
  winstonLogger.info(1 + 1 + `hello world`);
  winstonLogger.info(2 * (3 + 5) + `hello world`);

  // comments
  winstonLogger.info(var1 + /* comment */ 'hello world' + ' something else');

  // functions
  winstonLogger.info(f('a', 'b') + ' some text');
  winstonLogger.info(f('a', 'b') + 'some text');

  // other cases
  winstonLogger.info(o['prop'] + ' no value');
  winstonLogger.info(o['prop']['nestedProp'] + ' no value');
  winstonLogger.info(['1', '2', '3'] + ' something particular 2');

  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
