const express = require('express');
const db = require('../../database/MongoDB/index');

const router = express.Router();

router.get('/getRooms/:id', (req, res) => {
  const { id } = req.params;
  const min = Number(id) + 1;
  const max = min + 100;
  db.fetchRooms(min, max).then(data => res.send(data)).catch((error) => { throw error; });
});

router.get('/getImages/:id', (req, res) => {
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

router.post('/postRooms/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  data.id = Number(id);
  data.roomId = Number(id);
  db.postRooms(data).then(data => res.send('success')).catch((error) => { throw error; });
});

module.exports = router;
