const { Client } = require('pg');
const { expect } = require('chai');
const request = require('request');
// const server = require('../server/Postgres/index');

describe('server-test', () => {
  describe('routers', () => {
    it('should respond to GET requests for /:id with a 200 status code', (done) => {
      request.get('http://localhost:3004/1', (err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should respond to GET requests for /getRooms/:id with an array with data', (done) => {
      request.get('http://localhost:3004/getRooms/1', (err, res) => {
        const data = JSON.parse(res.body);
        expect(data).to.be.an('array');
        expect(data.length).to.not.equal(0);
        done();
      });
    });

    it('should respond to GET requests for /getImages/:id with an array with data', (done) => {
      request.get('http://localhost:3004/getImages/1', (err, res) => {
        const data = JSON.parse(res.body);
        expect(data).to.be.an('array');
        expect(data.length).to.not.equal(0);
        done();
      });
    });

    it('data should be objects with specified keys for /getImages/:id', (done) => {
      request.get('http://localhost:3004/getImages/1', (err, res) => {
        const data = JSON.parse(res.body);
        expect(data[1]).to.have.all.keys('id', 'urlToImage', 'roomId');
        done();
      });
    });
  });

  describe('database', () => {
    const client = new Client({
      user: 'leishao',
      host: 'localhost',
      database: 'sdc',
      port: 5432,
    });

    before(() => {
      client.connect();
    })

    after(() => {
      client.end();
    })

    it('should reponse to select query with an array with data', (done) => {
      const query = 'select * from descriptions where id between 1 and 2;';
      client.query(query, (err, results) => {
        if (err) throw err;

        if (results !== null) {
          expect(results.rows).to.be.an('array');
          done();
        }
      });
    })

    it('selected data should be objects with same keys as selected tables', (done) => {
      const query = 'select * from descriptions where id between 1 and 2;';
      client.query(query, (err, results) => {
        if (err) throw err;

        if (results !== null) {
          expect(results.rows[0]).to.have.all.keys('id', 'roomname', 'price', 'numberOfBedrooms', 'rating', 'numberOfReviews', 'roomType', 'instantBook');
          done();
        }
      });
    });
  });
});
