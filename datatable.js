const express = require('express');
const router = express.Router();
const pg = require('pg');
const db = require('./databaseHandler');

router.get('/', async function (req, res) {

    const sqlCountries = `select countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, 
                  continent, area, population from country, city where city.cityId = ANY(country.cities);`;
    try {
        const countriesResult = (await db.query(sqlCountries, [])).rows;
        res.render('datatable', {
            title: 'Datatable',
            countries: countriesResult,
            linkActive: 'datatable',
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router; 