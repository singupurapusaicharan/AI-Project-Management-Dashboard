const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  // 192.168.29.170
  user: 'root',
  password: 'Saya@090723',
  database: 'ai_dashboard',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = promisePool;