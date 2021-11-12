const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./databaseHandler');
const router = express.Router();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

var datatable = require('./datatable');
app.use('/datatable', datatable);

const methodOverride = require('method-override')
 
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

app.get('/drzave.json', (req, res) => {
    res.sendFile(path.join(__dirname + '/drzave.json'))
});

app.get('/drzave.csv', (req, res) => {
    res.sendFile(path.join(__dirname + '/drzave.csv'))
});

app.get('/pictures/worldMap.jpg', (req, res) => {
    res.sendFile(path.join(__dirname + '/pictures/worldMap.jpg'))
});

app.get('/style/index.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/style/index.css'))
});

app.get('/style/datatable.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/style/datatable.css'))
});

module.exports = router;

app.listen(3000, () => {
    console.log(`App running on port 3000.`)
});