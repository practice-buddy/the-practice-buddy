import express = require('express');
import exercise = require('../model/practiceFocus');
let router = express.Router();

import PracticeFocus = exercise.PracticeFocus;
import repository = exercise.repository;

let findSinglePracticeFocus = function (res) {
    return () => {
        repository.findOne()
            .populate('exercises')
            .exec((err, exercises) => {
                res.json(exercises);
            });
    }
};
router.get('/', (req, res) => {
    repository.count({}, (err, count) => {
        if (count === 0) {
            repository.create({"title" : "Current focus"}, findSinglePracticeFocus(res));
        } else {
            findSinglePracticeFocus(res)();
        }
    });
});

router.post('/', (req, res) => {
    repository.create(req.body, (err, ex) => {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

router.put('/', (req, res) => {
    repository.findByIdAndUpdate(req.body._id, req.body, (err, ex) => {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

module.exports = router;
