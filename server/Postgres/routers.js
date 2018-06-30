const redis = require('redis');
const express = require('express');
const db = require('../../database/Postgres/index');

const router = express.Router();
const client = redis.createClient('6379', 'localhost');

client.on('connect', () => {
  console.log('redis connected');
});

const cache = (req, res, next) => {
  const key = req.url.slice(1).split('/')[0];
  const { id } = req.params;
  client.get(`${key}-${id}`, (err, result) => {
    if (err) throw err;

    if (result !== null) {
      res.send(result);
    } else {
      next();
    }
  });
};
router.get('/favicon.ico', (req, res) => res.status(204));

router.get('/getRooms/:id', cache, (req, res) => {
  const key = req.url.slice(1).split('/')[0];
  const { id } = req.params;
  const min = Number(id) + 1;
  const max = min + 100;
  db.fetchRooms(min, max).then((data) => {
    client.setex(`${key}-${id}`, 30, JSON.stringify(data));
    res.send(data);
  }).catch((error) => { throw error; });
});

router.get('/getImages/:id', cache, (req, res) => {
  const key = req.url.slice(1).split('/')[0];
  const { id } = req.params;
  const min = Number(id) + 1;
  const max = min + 100;
  db.fetchImages(min, max).then((data) => {
    client.setex(`${key}-${id}`, 30, JSON.stringify(data));
    res.send(data);
  }).catch((error) => { throw error; });
});

router.post('/postImages/:id', (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  db.postImages(url, id).then(data => res.send('success')).catch((error) => { throw error; });
});

module.exports = router;
