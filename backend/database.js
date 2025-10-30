require('dotenv').config();
const { Client } = require('pg');

if (!global.__pgClient) {
    global.__pgClient = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT
    });

    global.__pgClient.connect().catch(err => {
        console.error('Failed to connect to Postgres:', err);
    });
}

module.exports = global.__pgClient;