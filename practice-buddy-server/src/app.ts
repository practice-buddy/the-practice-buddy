import express = require('express');
import path = require('path');

import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import mongoose = require('mongoose');
import exercises = require('./routes/exercises');
import practiceFocus = require('./routes/practiceFocus');
let app = express();


mongoose.connect('mongodb://localhost/test');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/exercises', exercises);
app.use('/practiceFocus', practiceFocus);

app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

module.exports = app;
