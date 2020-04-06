const express = require("express");
const cors = require('cors');
const app = express();
const port = 5000;
const router = require('./router');

let corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  method: ['POST'],
};

app.use(cors(corsOptions));
app.use('/', router);

app.listen(port, (err) => {
  if (err) {
    return console.log(`[ERROR] Can't start server on PORT:${port}`, err)
  }
  console.log(`[INFO] server is listening on http://localhost:${port}`)
});
