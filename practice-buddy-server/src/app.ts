import express = require('express');
import path = require('path');

import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import mongoose = require('mongoose');

import {attachmentContentRouter} from './routes/attachmentContent';
import {exerciseRouter} from './routes/exercises';
import {authRouter} from './routes/authServices';
import {practiceFocusRouter} from './routes/practiceFocus';

import compress = require('compression');
import {config} from './routes/common';
import {initAuth} from './routes/auth';

let app = express();

mongoose.connect(config().mongodbUrl);
initAuth(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compress());

//app.use(express.static(path.join(__dirname, 'public')));

app.use('/exercises', exerciseRouter);
app.use('/practiceFocus', practiceFocusRouter);
app.use('/auth', authRouter);
app.use('/attachments', attachmentContentRouter);


app.use(express.static(__dirname + '/client'));


app.get('/*', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

module.exports = app;
