const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./datatable');
const router = express.Router();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/index', function (req, res, next) {
    res.render('index', {
        title: 'Index',
        linkActive: 'index'
    });
});

const methodOverride = require('method-override')
 
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

app.get('/drzave.json', (req, res) => {
    res.sendFile(path.join(__dirname + '/drzave.json'))
});

app.get('/drzave.csv', (req, res) => {
    res.sendFile(path.join(__dirname + '/drzave.csv'))
});

app.get('/pictures/worldMap.jpg', (req, res) => {
    res.sendFile(path.join(__dirname + '/pictures/worldMap.jpg'))
});

app.get('/filter.json', (req, res) => {
    res.sendFile(path.join(__dirname + '/filter.json'))
});

app.get('/filter.csv', (req, res) => {
    res.sendFile(path.join(__dirname + '/filter.csv'))
});

app.get('/openapi.json', (req, res) => {
    res.sendFile(path.join(__dirname + '/openapi.json'))
});

app.get('/datatable', db.getCountriesDatatable)
app.post('/datatable/filter', db.getFilteredCountries)
app.get('/countries', db.getCountries)
app.get('/countries/:id', db.getCountryById)
app.get('/countries/continent/:value', db.getCountryByContinent)
app.get('/countries/currency/:value', db.getCountryByCurrency)
app.get('/countries/area/:value', db.getCountryByArea)
app.post('/countries', db.createCountry)
app.put('/countries/:id/:attribute/:value', db.updateCountry)
app.delete('/countries/:id', db.deleteCountry)

app.get('*', function(request, response){
    response.status(501).json({
        status: "Not Implemented",
        message: "Method not implemented.",
        response: null
    })
});

app.post('*', function(request, response){
    response.status(501).json({
        status: "Not Implemented",
        message: "Method not implemented.",
        response: null
    })
});

app.put('*', function(request, response){
    response.status(501).json({
        status: "Not Implemented",
        message: "Method not implemented.",
        response: null
    })
});

app.delete('*', function(request, response){
    response.status(501).json({
        status: "Not Implemented",
        message: "Method not implemented.",
        response: null
    })
});

app.patch('*', function(request, response){
    response.status(501).json({
        status: "Not Implemented",
        message: "Method not implemented.",
        response: null
    })
});

module.exports = router;

app.listen(3000, () => {
    console.log(`App running on port 3000.`)
});