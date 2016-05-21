import express = require('express');
import exercise = require('../model/exercise');
import simpleExercise = require('../model/simpleExercise');
import exerciseExecution = require('../model/exerciseExecution');
let router = express.Router();

import Exercise = exercise.Exercise;
import exerciseRepository = exercise.repository;
import simpleExerciseRepository = simpleExercise.simpleRepository;

import executionRepository  = exerciseExecution.repository;
import ExerciseExecution  = exerciseExecution.ExerciseExecution;

router.get('/', (req, res) => {
    exerciseRepository.find({}).populate('executions').exec((err, exercises) => {
        res.json(exercises);
    });
});


router.post('/:exerciseId/execution', (req, res) => {
    console.log('exerciseId: ' + req.params.exerciseId);
    exerciseRepository.findOne({"_id": req.params.exerciseId}, (err, exercise) => {
        let newExecution = {
            "date": new Date(),
            "personalPerformanceRating": req.body.personalPerformanceRating
        };
        executionRepository.create(newExecution, (err, execution) => {
            exercise.executions.unshift(execution);
            exercise.save((err) => {
                res.sendStatus(err ? 500 : 200)
            });
        })
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
