module.exports = {
  user: 'postgres',
  host: process.env.DB_HOST,
  database: 'sdc',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};
