import express = require('express');
import exercise = require('../model/exercise');
import simpleExercise = require('../model/simpleExercise');
let router = express.Router();

import Exercise = exercise.Exercise;
import exerciseRepository = exercise.repository;
import simpleExerciseRepository = simpleExercise.simpleRepository;

router.get('/', (req, res) => {
    exerciseRepository.find((err, exercises) => {
        res.json(exercises);
    });
});

router.post('/simpleExercises', (req, res) => {
    simpleExerciseRepository.create(req.body, (err, ex) => {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

router.put('/simpleExercises', (req, res) => {
    simpleExerciseRepository.findByIdAndUpdate(req.body._id, req.body, (err, ex) => {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

module.exports = router;
