const express = require('express');
const router = express.Router();
const pg = require('pg');
const app = express();
const fs = require('fs')
const fastcsv = require("fast-csv");
const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ORlab',
    password: 'bazepodataka',
    port: 5432,
});

const getCountriesDatatable = async function (request, response) {

    const queryRequest = `SELECT countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, 
                    continent, area, population FROM country, city where city.cityId = ANY(country.cities);`

    pool.query(queryRequest, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            response.render('datatable', {
                title: 'Datatable',
                countries: results.rows,
                linkActive: 'datatable',
            });
        }
    })
}

const getFilteredCountries = async function (request, response) {
    var v = request.body.vrijednost;
    var p = request.body.polje;

    var sqlCountries = null;
    if(p.localeCompare("sve") == 0) {
        if(!isNaN(parseInt(v))) {
            sqlCountries = `SELECT countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, continent, 
                area, population FROM country, city WHERE (city.cityId = ANY(country.cities)) AND ((countryId = ${v}) OR (callingcode = ${v}) 
                OR (citypopulation = ${v}) OR (area = ${v}) OR (population = ${v}))`;
        } else {
            sqlCountries = `SELECT countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, continent, 
                area, population FROM country, city WHERE (city.cityId = ANY(country.cities)) AND ((countryName LIKE '%${v}%') OR 
                (ISOCode LIKE '%${v}%') OR (currency LIKE '%${v}%') OR (language LIKE '%${v}%') OR (cityName LIKE '%${v}%') OR 
                (continent LIKE '%${v}%'))`;
        }
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
        pool.query(sqlCountries, (error, results) => {
            if (error) {
              console.log(error)
            } else {
                fs.writeFile('filter.json', JSON.stringify(results.rows), (err) => {
                    if (err) console.log(error);
                })

                const ws = fs.createWriteStream("filter.csv");
                const jsonData = JSON.parse(JSON.stringify(results.rows));
                fastcsv.write(jsonData, { headers: true }).pipe(ws);

                response.render('datatable', {
                    title: 'Datatable',
                    countries: results.rows,
                    linkActive: 'datatable',
                });
            }
        })
    } catch (err) {
        console.log(err);
    }
};

const getIndex = (request, response, next) => {
    res.render('index', {
        title: 'Index',
        linkActive: 'index'
    });
};

const getCountries = (request, response) => {

    const queryRequest = `SELECT countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, 
                    continent, area, population FROM country, city where city.cityId = ANY(country.cities);`

    pool.query(queryRequest, (error, results) => {
        if (error) {
            console.log(error)
            response.status(500).json({
                status: "Internal Server Error",
                message: "An error has occured on the server.",
                response: null
            })
        } else {
            response.status(200).json({
                status: "OK",
                message: "Returned list of all the countries in the database.",
                response: results.rows
            })
        }
    })
}

const getCountryById = (request, response) => {
    const countryId = parseInt(request.params.id)

    pool.query(`SELECT countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, 
                    continent, area, population FROM country, city where (city.cityId = ANY(country.cities)) AND (countryId = ($1))`, [countryId], 
                (error, results) => {
        if (error) {
            console.log(error)
            response.status(400).json({
                status: "Bad Request",
                message: "Invalid Request.",
                response: null
            })
        } else {
            if(results.rowCount > 0) {
                response.status(200).json({
                    status: "OK",
                    message: "Country with countryId: " + countryId,
                    response: results.rows
                })
            } else {
                response.status(404).json({
                    status: "Not Found",
                    message: "No country with countryId: " + countryId,
                    response: null
                })
            }
        }
    })
}

const getCountryByContinent = (request, response) => {
    const continent = request.params.value

    pool.query(`SELECT countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, 
                    continent, area, population FROM country, city where (city.cityId = ANY(country.cities)) AND (continent LIKE '%${continent}%')`, [], 
                (error, results) => {
        if (error) {
            console.log(error)
            response.status(400).json({
                status: "Bad Request",
                message: "Invalid Request.",
                response: null
            })
        }
        if(results.rowCount > 0) {
            response.status(200).json({
                status: "OK",
                message: "List of countries located in " + continent,
                response: results.rows
            })
        } else {
            response.status(404).json({
                status: "Not Found",
                message: "No countries are located in " + continent,
                response: null
            })
        }
    })
}

const getCountryByCurrency = (request, response) => {
    const currency = request.params.value

    pool.query(`SELECT countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, 
                    continent, area, population FROM country, city where (city.cityId = ANY(country.cities)) AND (currency LIKE '%${currency}%')`, [], 
                (error, results) => {
            if (error) {
                console.log(error)
                response.status(400).json({
                    status: "Bad Request",
                    message: "Invalid Request.",
                    response: null
                })
            }
            if(results.rowCount > 0) {
                response.status(200).json({
                    status: "OK",
                    message: "List of countries with " + currency + " as their currency",
                    response: results.rows
                })
            } else {
                response.status(404).json({
                    status: "Not Found",
                    message: "No countries use " + currency + " as their currency",
                    response: null
                })
            }
    })
}

const getCountryByArea = (request, response) => {
    const area = parseInt(request.params.value)

    pool.query(`SELECT countryId, countryName, ISOcode, callingCode, currency, language, cityName, cityPopulation, 
                    continent, area, population FROM country, city where (city.cityId = ANY(country.cities)) AND (area > $1)`, [area], 
                (error, results) => {
        if (error) {
            console.log(error)
            response.status(400).json({
                status: "Bad Request",
                message: "Invalid Request.",
                response: null
            })
        }
        if(results.rowCount > 0) {
            response.status(200).json({
                status: "OK",
                message: "List of countries that have area greater than " + area,
                response: results.rows
            })
        } else {
            response.status(404).json({
                status: "Not Found",
                message: "No countries have area greater than " + area,
                response: null
            })
        }
    })
}

const createCountry = (request, response) => {
    const { countryId, countryName, ISOcode, callingCode, currency, language, continent, area, population } = request.query

    pool.query(`insert into country(countryId, countryName, ISOcode, callingCode, currency, language, cities, continent, area, population) 
        values (${countryId}, '${countryName}', '${ISOcode}', ${callingCode}, '${currency}', '${language}', ARRAY[1,2], '${continent}', ${area}, 
            ${population});`, [], (error, results) => {
        if (error) {
            console.log(error)
            response.status(400).json({
                status: "Bad Request",
                message: "Invalid request.",
                response: null
            })
        } else {
            response.status(201).json({
                status: "Created",
                message: "Created new country.",
                response: {
                    links: [
                        {
                            href: '/countries/' + countryId,
                            ref: 'View new country',
                            type: 'GET'
                        }
                    ]
                }
            })
        }
    })
}

const updateCountry = (request, response) => {
    const countryId = parseInt(request.params.id)
    const { population, area } = request.query

    pool.query('UPDATE country SET population = $1, area = $2 WHERE countryId = $3',
        [population, area, countryId],
        (error, results) => {
            if (error) {
                console.log(error)
                response.status(400).json({
                    status: "Bad Request",
                    message: "Invalid request.",
                    response: null
                })
            } else {
                if(results.rowCount > 0) {
                    response.status(200).json({
                        status: "Modified",
                        message: 'Country modified with ID: ' + countryId,
                        response: {
                            links: [
                                {
                                    href: '/countries/' + countryId,
                                    ref: 'View modified country',
                                    type: 'GET'
                                }
                            ]
                        }
                    })
                } else {
                    response.status(404).json({
                        status: "Not Found",
                        message: "No country with countryId " + countryId,
                        response: null
                    })
                }
            }
        }
    )
}

const deleteCountry = (request, response) => {
    const countryId = parseInt(request.params.id)

    pool.query('DELETE FROM country WHERE countryId = $1', [countryId], (error, results) => {
        if (error) {
            console.log(error)
            response.status(400).json({
                status: "Bad Request",
                message: "Invalid request.",
                response: null
            })
        } else {
            if(results.rowCount > 0) {
                response.status(200).json({
                    status: "Deleted",
                    message: 'Country deleted with ID: ' + countryId,
                    response: {
                        links: [
                            {
                                href: '/countries/',
                                ref: 'View all countries',
                                type: 'GET'
                            }
                        ]
                    }
                })
            } else {
                response.status(404).json({
                    status: "Not Found",
                    message: "No country with countryId " + countryId,
                    response: null
                })
            }
        }
    })
}

module.exports = {
    getCountriesDatatable,
    getFilteredCountries,
    getIndex,
    getCountries,
    getCountryById,
    getCountryByContinent,
    getCountryByCurrency,
    getCountryByArea,
    createCountry,
    updateCountry,
    deleteCountry,
}