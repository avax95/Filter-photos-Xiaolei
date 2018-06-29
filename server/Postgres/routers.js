const redis = require('redis');
const express = require('express');
const db = require('../../database/Postgres/index');

const router = express.Router();
const client = redis.createClient('6379', 'localhost');

client.on('connect', () => {
  console.log('redis connected')
})

router.get('/favicon.ico', (req, res) => res.status(204));

router.get('/getRooms/:id', (req, res) => {
  const { id } = req.params;
  client.get(`room-${id}`, (err, result) => {
    if (result) {
      res.send(JSON.parse(result));
    } else {
      const min = Number(id) + 1;
      const max = min + 100;
      db.fetchRooms(min, max).then((data) => {
        client.setex(`room-${id}`, 30, JSON.stringify(data));
        res.send(data);
      }).catch((error) => { throw error; });
    }
  });
});

router.get('/getImages/:id', (req, res) => {
  const { id } = req.params;
  const min = Number(id) + 1;
  const max = min + 100;
  db.fetchImages(min, max).then(data => res.send(data)).catch((error) => { throw error; });
});

router.post('/postImages/:id', (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  db.postImages(url, id).then(data => res.send('success')).catch((error) => { throw error; });
});

module.exports = router;
