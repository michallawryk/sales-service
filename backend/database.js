const { Pool } = require('pg')
// const pool = new Pool({
//     user: 'postgres',
//     password: 'pa$$',
//     host: 'localhost',
//     port: '5432',
//     database: 'app',
// })
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/app';
const pool = new Pool({ connectionString });

module.exports = pool