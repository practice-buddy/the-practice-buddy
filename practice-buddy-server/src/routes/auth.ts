export let initAuth =  (app) => {
    let mongoose = require('mongoose');
    let express = require('express');
    let bcrypt = require('bcrypt-nodejs');


    let passport = require('passport');
    let passportLocal = require('passport-local');

    let user = require('../model/user');

    let session = require('express-session');
    let MongoStore = require('connect-mongo')(session);

    app.use(session({
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
        secret: 'codecamp rigi 2016',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local', new passportLocal.Strategy(
        function (username, password, done) {
            console.log(username);
            console.log(password);
            user.repository.findOne({name: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                console.log(user)
                if (!user) {
                    return done(null, false, {alert: 'Incorrect username.'});
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, {alert: 'Incorrect password.'});
                }
                return done(null, user);
            });
        }
    ));

}