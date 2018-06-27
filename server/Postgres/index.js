const nr = require('newrelic');
const path = require('path');
const cors = require('cors');
const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const numCPUs = require('os').cpus().length;
const router = require('./routers.js');

const port = process.env.serverPort || 3004;

if (cluster.isMaster) {
  for (let i = 0; i< numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code) {
      console.log(`Worker ${worker.process.pid} killed by error, code ${code}`);
    } else {
      console.log(`worker ${worker.process.pid} died`);
    }
  });
} else {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/:id', express.static(path.join(__dirname, '/../../client/dist')));
  app.use('/', router);

  app.listen(port, () => {
    console.log(`Worker ${process.pid} listening on port ${port}`);
  });
}
