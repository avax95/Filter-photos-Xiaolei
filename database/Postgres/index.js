const { Client } = require('pg');
const config = require('./config.js');

const client = new Client(config);

client.connect();

const fetchRooms = (min, max) => {
  const query = `select * from descriptions where id between ${min} and ${max};`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const fetchImages = (min, max) => {
  const query = `select * from images where "roomId" between ${min} and ${max};`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const postImages = (url, roomId) => {
  const query = `insert into images ("urlToImage", "roomId") values ('${url}', ${roomId})`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const putImages = (url, roomId) => {
  const query = `UPDATE images SET "urlToImage" = ${url} where "roomId" = ${roomId}`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteImages = (roomId) => {
  const query = `delete from images where "roomId" = ${roomId}`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.rows);
      }
    });
  });
};

module.exports = {
  fetchRooms,
  fetchImages,
  postImages,
  putImages,
  deleteImages,
};
