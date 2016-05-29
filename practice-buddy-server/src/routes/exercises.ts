import express = require('express');
import fs = require('fs');
import multer  = require('multer');
import * as _ from 'lodash';
import {ExerciseLibrary} from "../model/exerciseLibrary";
let upload = multer();
import {isAuthenticated} from './common';

import exercise = require('../model/exercise');
import simpleExercise = require('../model/simpleExercise');
import flashcardExercise = require('../model/flashcardExercise');
import exerciseExecution = require('../model/exerciseExecution');
import flashcardGroup = require('../model/flashcardGroup');
import libraryService = require('./library');
import attachmentService = require('./attachmentContent');

import {ExerciseAttachment} from "../model/exerciseAttachment";

import Exercise = exercise.Exercise;
import exerciseRepository = exercise.repository;
import simpleExerciseRepository = simpleExercise.simpleRepository;
import flashcardExerciseRepository = flashcardExercise.flashcardRepository;

import executionRepository  = exerciseExecution.repository;
import ExerciseExecution  = exerciseExecution.ExerciseExecution;

export let exerciseRouter = express.Router();
exerciseRouter.use(isAuthenticated);

exerciseRouter.get('/', (req, res) => {
    libraryService.getOrCreateLibrary(req, (err, library) => {
        res.json(library.exercises)
    });
});

exerciseRouter.get('/:exerciseId', (req, res) => {
    exerciseRepository.findOne({"_id": req.params.exerciseId}, (err, exercise) => {
        res.json(exercise);
    });
});

exerciseRouter.post('/:exerciseId/attachments', upload.any(), (req, res) => {
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

exerciseRouter.post('/:exerciseId/execution', (req, res) => {
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

exerciseRouter.post('/simpleExercises', (req, res) => {
    libraryService.getOrCreateLibrary(req, (err, library:ExerciseLibrary) => {
        simpleExerciseRepository.create(req.body, (err, ex) => {
            if (err) return console.error(err);
            libraryService.addExerciseToLibrary(library, ex, res);
        });
    });
});


let deleteAttachments = function (body:any):void {
    _.forEach(body.attachments, (attachment) => {
        if (attachment.deleted) {
            attachmentService.deleteAttachment(body, attachment)
        }
    });

    body.attachments = _.reject(body.attachments, {deleted: true})
}

exerciseRouter.put('/simpleExercises', (req, res) => {
    deleteAttachments(req.body)
    simpleExerciseRepository.findByIdAndUpdate(req.body._id, req.body, (err, ex) => {
        if (err) return console.error(err);

        res.sendStatus(200);
    });
});


exerciseRouter.post('/flashcardExercises', (req, res) => {
    libraryService.getOrCreateLibrary(req, (err, library:ExerciseLibrary) => {
        flashcardExerciseRepository.create(req.body, (err, ex:Exercise) => {
            if (err) return console.error(err);
            libraryService.addExerciseToLibrary(library, ex, res);
        });
    });
});

exerciseRouter.put('/flashcardExercises', (req, res) => {
    deleteAttachments(req.body)
    flashcardExerciseRepository.findByIdAndUpdate(req.body._id, req.body, (err, ex) => {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});
