const pg = require('pg');
const config = require('./config.js');

const pool = new pg.Pool(config);

pool.connect().then((client) => {
  client.query(`insert into descriptions (roomname) values ('haha')`).then(res => console.log('insert success'));
})
