let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let passport = require('passport');
let user = require('../model/user');
import bcrypt = require('bcrypt-nodejs');



passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    user.repository.findById(id, function (err, user) {
        done(err, user);
    });
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())return next();
    res.send(401);
}

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user);
});

router.get('/currentuser', isAuthenticated, function (req, res) {
    res.json(req.user);
});

router.post('/signup', function (req, res) {

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

router.get('/logout', function (req, res) {
    console.log('logout');
    req.logout();
    res.send(200);
});

module.exports = router;