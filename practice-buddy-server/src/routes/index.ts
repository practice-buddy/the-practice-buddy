import express = require('express');
import SimpleExercise = require('../model/exercise');
let router = express.Router();

router.get('/exercises', function (req, res) {
    SimpleExercise.find((err, exercises) => {
        res.json(exercises);
    });
});

router.put('/exercises', function (req, res) {
    var newExercise = new SimpleExercise({
        title: 'Exercise 1'
    });
    console.log(req);

    SimpleExercise.save(function(err, ex) {
        if (err) return console.error(err);
        console.dir(ex);
    });
});

module.exports = router;
