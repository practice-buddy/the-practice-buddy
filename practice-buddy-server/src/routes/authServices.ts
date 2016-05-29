let mongoose = require('mongoose');
let express = require('express');
let passport = require('passport');
let user = require('../model/user');
import bcrypt = require('bcrypt-nodejs');
import {isAuthenticated} from './common';

export let authRouter = express.Router();


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    user.repository.findById(id, function (err, user) {
        done(err, user);
    });
});

authRouter.post('/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user);
});

authRouter.get('/currentuser', isAuthenticated, function (req, res) {
    res.json(req.user);
});


authRouter.post('/signup', function (req, res) {

    var u = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password),
        email: req.body.email
    };
    user.repository.create(u, function (err) {
        if (err) {
            res.json({'alert': 'Registration error'});
        } else {
            res.json({'alert': 'Registration success'});
        }
    });
});

authRouter.get('/logout', function (req, res) {
    req.logout();
    res.send(200);
});