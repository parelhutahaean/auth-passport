const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const index = require('./routes/index');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authpassport');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/', index);

app.listen(3000);

module.exports = app;
