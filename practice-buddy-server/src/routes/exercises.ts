import express = require('express');
import fs = require('fs');
import multer  = require('multer')
let upload = multer();

import exercise = require('../model/exercise');
import simpleExercise = require('../model/simpleExercise');
import flashcardExercise = require('../model/flashcardExercise');
import exerciseExecution = require('../model/exerciseExecution');
import flashcardGroup = require('../model/flashcardGroup');
import attachmentContent = require('../model/attachmentContent');
import * as _ from 'lodash';
import {ExerciseAttachment} from "../model/exerciseAttachment";
let router = express.Router();

import Exercise = exercise.Exercise;
import exerciseRepository = exercise.repository;
import simpleExerciseRepository = simpleExercise.simpleRepository;
import flashcardExerciseRepository = flashcardExercise.flashcardRepository;

import executionRepository  = exerciseExecution.repository;
import ExerciseExecution  = exerciseExecution.ExerciseExecution;

import attachmentContentRepository  = attachmentContent.repository;

router.get('/', (req, res) => {
    exerciseRepository.find({}).populate('executions').exec((err, exercises) => {
        res.json(exercises);
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
            attachmentContentRepository.create(file, (err, attachmentContent) => {
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
            })
        });


    });
});


router.get('/attachments/:attachmentId', (req, res) => {
    attachmentContentRepository.findOne({"_id": req.params.attachmentId}, (err, file) => {
        if (err || !file) {
            res.sendStatus(404);
            return;
        }
        var total = file.buffer.length;
        if (req.headers.range) {
            var range = req.headers.range;
            var parts = range.replace(/bytes=/, "").split("-");
            var partialstart = parts[0];
            var partialend = parts[1];

            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : total - 1;

            if (_.isNaN(end)) {
                end = total - 1;
            }


            var chunksize = (end - start) + 1;
            res.writeHead(206, {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize
            });
            res.write(file.buffer.slice(start, end));
        } else {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(file.buffer);
            }
        }

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


let deleteAttachment = function (exercise, attachment) {
    attachmentContentRepository.findByIdAndRemove(attachment.content, (err) => {
        if (err) {
            console.log('Could not delete file: ' + attachment + ' error:'  + err);
        }
    });
};

this.deleteAttachments = function (body:any):void {
    _.forEach(body.attachments, (attachment) => {
        if (attachment.deleted) {
            deleteAttachment(body, attachment)
        }
    });

    body.attachments = _.reject(body.attachments, {deleted: true})
}

router.put('/simpleExercises', (req, res) => {

    console.log(req.body);
    this.deleteAttachments(req.body)

    simpleExerciseRepository.findByIdAndUpdate(req.body._id, req.body, (err, ex) => {
        if (err) return console.error(err);

        res.sendStatus(200);
    });
});

router.post('/flashcardExercises', (req, res) => {
    flashcardExerciseRepository.create(req.body, (err, ex) => {
        if (err) return console.error(err);
        res.sendStatus(200);
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
