const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/Postgres/index');

const app = express();
const port = process.env.serverPort || 3004;

app.use(bodyParser.json());
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));
app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Mehods',
      'GET, POST, PUT, PATCH, DELETE',
    );
    return res.status(200).json({});
  }
  next();
});

app.get('/getRooms/:id', (req, res) => {
  const { id } = req.params;
  const min = Number(id) + 1;
  const max = min + 100;
  db.fetchRooms(min, max).then(data => res.send(data)).catch((error) => { throw error; });
});

app.get('/getImages/:id', (req, res) => {
  const { id } = req.params;
  const min = Number(id) + 1;
  const max = min + 100;
  db.fetchImages(min, max).then(data => res.send(data)).catch((error) => { throw error; });
});

app.post('/postImages/:id', (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  db.postImages(url, id).then(data => res.send('success')).catch((error) => { throw error; });
});
