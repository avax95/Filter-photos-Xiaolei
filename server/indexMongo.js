const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/MongoDB/index.js');

const app = express();
const port = process.env.serverPort || 3005;

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
  db.fetchRooms(min, max).then((data) => {
    const images = [];
    data.forEach((el) => {
      el.urls.split(',').forEach((url) => {
        const obj = {
          roomId: el.roomId,
          urlToImage: url,
        };
        images.push(obj);
      });
    });
    res.send(images);
  }).catch((error) => { throw error; });
});

app.post('/postRooms/:id', (req,res) => {
  const { id } = req.params;
  const data = req.body;
  data.id = Number(id);
  data.roomId = Number(id);
  db.postRooms(data).then(data => res.send('success')).catch((error) => { throw error; });
});
