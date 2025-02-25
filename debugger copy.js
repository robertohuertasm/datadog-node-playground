const express = require('express');
require('dotenv').config();

const winstonLogger = require('./logger').winstonLogger;

winstonLogger.info(['1', '2', '3'] + 'something');

// winstonLogger.info(['1', '2', '3']);

//   winstonLogger.info(var1 + /* comment */ 'hello world' + ' something else');
