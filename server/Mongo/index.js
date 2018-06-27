const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers.js');


const app = express();
const port = process.env.serverPort || 3005;

app.use(cors());
app.use(bodyParser.json());
app.use('/:id', express.static(path.join(__dirname, '/../../client/dist')));
app.use('/', router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

