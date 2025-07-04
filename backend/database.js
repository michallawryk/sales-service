const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    password: 'pa$$',
    host: 'localhost',
    port: '5432',
    database: 'app',
})

module.exports = pool