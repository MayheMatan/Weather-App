const express = require('express');
const path = require("path")
const app = express();
const api = require('./server/routes/api');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost/weather', { useNewUrlParser: true });
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', api);


const port = 3000;
app.listen(port, () => console.log(`Running server on port ${ port }`));