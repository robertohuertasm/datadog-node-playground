const express = require('express');
require('dotenv').config();

const winstonLogger = require('./logger').winstonLogger;
const log = winstonLogger.info;

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  const a = '1';
  log(`msg=${a}`);
  log(`msg+${a}`);
  log(`msg-${a}`);
  log(`msg<${a}`);
  log(`msg>${a}`);
  log(`msg!${a}`);
  log(`msg(${a}`);
  log(`msg{${a}`);
  log(`msg[${a}`);
  log(`msg^${a}`);
  log(`msg*${a}`);
  log(`msg?${a}`);
  log(`msg:${a}`);
  log(`msg#${a}`);

  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
