const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers.js');


const app = express();
const port = process.env.serverPort || 3005;

app.use('/', router);
app.use(cors());
app.use(bodyParser.json());
app.use('/:id', express.static(path.join(__dirname, '/../../client/dist')));

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
