const {Pool} = require('pg');

// const fetch = require('node-fetch');
var cacheManager = require('cache-manager');
var cacheManagerFs = require('cache-manager-fs');
var cache = cacheManager.caching({
  store: cacheManagerFs, 
  options: {
    ttl: 60*60, 
    maxsize: 1000*1000*1000, 
    path:'fscache', 
    preventfill:true, 
    reviveBuffers: true
  }
});

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
                //console.log('executed query', {text, params, duration, rows: res.rows});
                return res;
            });
    },
    pool: pool
}
