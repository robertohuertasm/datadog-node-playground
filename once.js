const express = require("express");
require("dotenv").config();

const winstonLogger = require("./logger").winstonLogger;
const log = winstonLogger.info;

const app = express();
const port = 8081;

app.get("/", (req, res) => {
  const var1 = "var1Value";
  const f = () => {
    console.log("b");
    // foo.log('a');
    // logger.log('a');
    // error( 'a');

    // log("hello");
  };

  const o = {
    prop: "someValue",
  };

  // interpolation
  winstonLogger.info(
    `nested interpolation
    ${`this is a valid string ${Date.now()}`}`
  );
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
