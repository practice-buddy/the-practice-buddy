import express = require('express');
import fs = require('fs');
import multer  = require('multer');
import * as _ from 'lodash';
import {ExerciseLibrary} from "../model/exerciseLibrary";
let upload = multer();

import exercise = require('../model/exercise');
import simpleExercise = require('../model/simpleExercise');
import flashcardExercise = require('../model/flashcardExercise');
import exerciseExecution = require('../model/exerciseExecution');
import flashcardGroup = require('../model/flashcardGroup');
import libraryService = require('./library');
import attachmentService = require('./attachmentContent');

import {ExerciseAttachment} from "../model/exerciseAttachment";
let router = express.Router();

import Exercise = exercise.Exercise;
import exerciseRepository = exercise.repository;
import simpleExerciseRepository = simpleExercise.simpleRepository;
import flashcardExerciseRepository = flashcardExercise.flashcardRepository;

import executionRepository  = exerciseExecution.repository;
import ExerciseExecution  = exerciseExecution.ExerciseExecution;

router.get('/', (req, res) => {
    libraryService.getOrCreateLibrary(req, (err, library) => {
        res.json(library.exercises)
    });
});

router.get('/:exerciseId', (req, res) => {
    exerciseRepository.findOne({"_id": req.params.exerciseId}, (err, exercise) => {
        res.json(exercise);
    });
});

router.post('/:exerciseId/attachments', upload.any(), (req, res) => {
    exerciseRepository.findOne({"_id": req.params.exerciseId}, (err, exercise) => {
        _.forEach(req.files, (file) => {
            attachmentService.createAttachmentContent(file,
                (err, attachmentContent) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        let exerciseAttachment = {
                            mimetype: file.mimetype,
                            name: file.originalname,
                            content: attachmentContent
                        };
                        exercise.attachments.push(exerciseAttachment);
                        exercise.save((err) => {
                            res.sendStatus(err ? 500 : 200)
                        });
                    }
                });
        });
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
    libraryService.getOrCreateLibrary(req, (err, library:ExerciseLibrary) => {
        simpleExerciseRepository.create(req.body, (err, ex) => {
            if (err) return console.error(err);
            libraryService.addExerciseToLibrary(library, ex, res);
        });
    });
});


this.deleteAttachments = function (body:any):void {
    _.forEach(body.attachments, (attachment) => {
        if (attachment.deleted) {
            attachmentService.deleteAttachment(body, attachment)
        }
    });

    body.attachments = _.reject(body.attachments, {deleted: true})
}

router.put('/simpleExercises', (req, res) => {
    this.deleteAttachments(req.body)
    simpleExerciseRepository.findByIdAndUpdate(req.body._id, req.body, (err, ex) => {
        if (err) return console.error(err);

        res.sendStatus(200);
    });
});


router.post('/flashcardExercises', (req, res) => {
    libraryService.getOrCreateLibrary(req, (err, library:ExerciseLibrary) => {
        flashcardExerciseRepository.create(req.body, (err, ex:Exercise) => {
            if (err) return console.error(err);
            libraryService.addExerciseToLibrary(library, ex, res);
        });
    });
});

router.put('/flashcardExercises', (req, res) => {
    this.deleteAttachments(req.body)
    flashcardExerciseRepository.findByIdAndUpdate(req.body._id, req.body, (err, ex) => {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

module.exports = router;
