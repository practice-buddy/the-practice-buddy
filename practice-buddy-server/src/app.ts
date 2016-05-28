import express = require('express');
import path = require('path');

import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import mongoose = require('mongoose');
import exercises = require('./routes/exercises');
import practiceFocus = require('./routes/practiceFocus');
import authService = require('./routes/authServices');
let app = express();

let db = mongoose.connect('mongodb://localhost/test');
require('./routes/auth')(app, db);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/exercises', exercises);
app.use('/practiceFocus', practiceFocus);
app.use('/auth', authService);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())return next();
    res.send(401);
}

exercises.use(isAuthenticated);
practiceFocus.use(isAuthenticated);


app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

module.exports = app;
