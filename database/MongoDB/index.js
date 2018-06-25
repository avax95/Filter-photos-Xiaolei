const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sdc');

const { connection } = mongoose;
connection.on('open', () => {
  console.log('success connect to the database');
});

connection.on('error', (error) => {
  console.log('fail to connect' + error);
});

mongoose.Promise = global.Promise;

const fetchRooms = (min, max) => {
  return new Promise((resolve, reject) => {
    connection.collection('rooms').find({ roomId: { $gte: min, $lte: max } }).toArray((error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const postRooms = (data) => {
  return new Promise((resolve, reject) => {
    connection.collection('rooms').save(data, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};

module.exports = {
  fetchRooms,
  postRooms,
};
