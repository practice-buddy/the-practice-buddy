import express = require('express');
import exercise = require('../model/practiceFocus');
import {ExerciseLibrary} from "../model/exerciseLibrary";
import {PracticeFocus} from "../model/practiceFocus";
import libraryService = require('./library');
import PracticeFocus = exercise.PracticeFocus;
import * as _ from 'lodash';
import {PracticeFocus} from "../model/practiceFocus";


let router = express.Router();

router.get('/', (req, res) => {
    libraryService.getOrCreateLibrary(req, (err, library:ExerciseLibrary) => {
        if (library.practiceFocuses.length === 0) {
            var practiceFocus = <PracticeFocus>{title: "Current focus"};
            library.practiceFocuses.push(practiceFocus);
            library.save((err, library:ExerciseLibrary)=> {
                res.json(library.practiceFocuses[0]);
            })
        } else {
            res.json(library.practiceFocuses[0]);
        }
    });
});

router.put('/', (req, res) => {
    libraryService.getOrCreateLibrary(req, (err, library:ExerciseLibrary) => {
        let practiceFocus:PracticeFocus = _.find(library.practiceFocuses, {id: req.body._id});
        practiceFocus.exercises = _.map(req.body.exercises, '_id');
        library.save((err, library) => {
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });
});

module.exports = router;
