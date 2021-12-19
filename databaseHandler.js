const {Pool} = require('pg');
const express = require('express');
const router = express.Router();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ORlab',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
              const duration = Date.now() - start;
              return res;
            });
    },
    pool: pool
}