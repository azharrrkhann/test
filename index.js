require('rootpath')();
const morgan = require('morgan');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

mongoose.connect("mongodb://localhost:27017/reactNodeApp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
// app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname, 'public')))

// use JWT auth to secure the api
app.use(jwt());

app.get('/', function (req, res) {
    res.json("its backend")
});

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + `localhost:${port}`);
});