const express = require("express");
const app = express();
const port = 5000;
const router = require('./router');

app.use('/', router);

app.listen(port, (err) => {
  if (err) {
    return console.log(`[ERROR] Can't start server on PORT:${port}`, err)
  }
  console.log(`[INFO] server is listening on http://localhost:${port}`)
});
