import express = require('express');
import exercise = require('../model/practiceFocus');
let router = express.Router();

import PracticeFocus = exercise.PracticeFocus;
import repository = exercise.repository;

router.get('/', (req, res) => {
    repository.find({})
        .populate('exercises')
        .exec((err, exercises) => {
            res.json(exercises);
        });
});

router.post('/', (req, res) => {
    repository.create(req.body, (err, ex) => {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

module.exports = router;
