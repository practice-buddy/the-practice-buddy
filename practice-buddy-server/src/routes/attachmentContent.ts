import express = require('express');
import * as _ from 'lodash';
import {isAuthenticated} from './common';

import attachmentContent = require('../model/attachmentContent');
import attachmentContentRepository  = attachmentContent.repository;

export let attachmentContentRouter = express.Router();
attachmentContentRouter.use(isAuthenticated);

attachmentContentRouter.get('/:attachmentId', (req, res) => {
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

export let createAttachmentContent = (file, callback) => {
    attachmentContentRepository.create(file, (err, attachmentContent) => {
        callback(err, attachmentContent);
    })
}

export let deleteAttachment = function (exercise, attachment) {
    attachmentContentRepository.findByIdAndRemove(attachment.content, (err) => {
        if (err) {
            console.log('Could not delete file: ' + attachment + ' error:' + err);
        }
    });
};
