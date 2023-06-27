const mysql = require('mysql2/promise');
const config = require('./config/config');

const pool = mysql.createPool(config.params('produzione'));//staging

module.exports = pool;