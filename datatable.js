const express = require('express');
const router = express.Router();
const pg = require('pg');
const app = express();
const db = require('./databaseHandler');
const fs = require('fs')

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

router.post('/filter', async function (req, res){
    var v = req.body.vrijednost;
    var p = req.body.polje;

    console.log("Vrijednost:" + v + "  Polje: " + p + "\n");
    
    var sqlCountries = null;
    if(p.localeCompare("sve") == 0) {
        sqlCountries = `SELECT countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, continent, area, population 
                FROM country, city WHERE city.cityId = ANY(country.cities) AND ((countryId = ${v}) OR (countryName LIKE '%${v}%') OR (ISOCode LIKE '%${v}%') OR 
                    (callingcode = ${v}) OR (currency LIKE '%${v}%') OR (language LIKE '%${v}%') OR (cityName LIKE '%${v}%') OR 
                    (citypopulation = ${v}) OR (continent LIKE '%${v}%') OR (area = ${v}) OR (population = ${v}))`;
    } else {
        if((p.localeCompare("countryId") == 0) || (p.localeCompare("ISOCode") == 0) || 
            (p.localeCompare("callingCode") == 0) || (p.localeCompare("area") == 0) || 
            (p.localeCompare("population") == 0))   {
                sqlCountries = `select countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, 
                continent, area, population FROM country, city WHERE city.cityId = ANY(country.cities) AND (${p} = ${v});`;
        } else {
            sqlCountries = `select countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, 
            continent, area, population FROM country, city WHERE city.cityId = ANY(country.cities) AND (${p} LIKE '%${v}%');`;
        }  
    }
    try {
        const countriesResult = (await db.query(sqlCountries, [])).rows;
        fs.writeFile('filter.json', JSON.stringify(countriesResult), (err) => {
            if (err) throw err;
        })
        app.get('/filter.json', (req, res) => {
            res.sendFile(path.join(__dirname + '/filter.json'))
        });
        res.render('datatable', {
            title: 'Datatable',
            countries: countriesResult,
            linkActive: 'datatable',
        });
    } catch (err) {
        console.log(err);
    }
});

var index = require('./index');
router.get('/index', function (req, res, next) {
    res.render('index', {
        title: 'Index',
        linkActive: 'index'
    });
});


module.exports = router; 