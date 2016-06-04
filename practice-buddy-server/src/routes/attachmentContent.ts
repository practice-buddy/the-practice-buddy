import express = require('express');
import * as _ from 'lodash';
import {isAuthenticated} from './common';

import zlib = require('zlib');


import attachmentContent = require('../model/attachmentContent');
import attachmentContentRepository  = attachmentContent.repository;

export let attachmentContentRouter = express.Router();
attachmentContentRouter.use(isAuthenticated);

let writeHeader = (res, contentRange, total) => {
    console.log(contentRange);
    res.writeHead(206, {
        'Content-Range': contentRange,
        'Accept-Ranges': 'bytes',
        'Content-Length': total
    });
};

let parseEnd = (totalEnd, partialend) => {
    let end = partialend ? parseInt(partialend, 10) : totalEnd;
    if (_.isNaN(end)) {
        end = totalEnd;
    }
    return end;
}

attachmentContentRouter.get('/:attachmentId', (req, res) => {
    attachmentContentRepository.findOne({"_id": req.params.attachmentId}, (err, file) => {
        if (err || !file) {
            res.sendStatus(404);
            return;
        }
        zlib.unzip(file.buffer, (err, buffer)=> {
            let total = buffer.length;
            let totalEnd = total - 1;
            if (req.headers.range) {
                let range = req.headers.range;
                let parts = range.replace(/bytes=/, "").split("-");
                let partialstart = parts[0];
                let partialend = parts[1];

                let start = parseInt(partialstart, 10);
                let end = parseEnd(totalEnd, partialend);
                let chunk = buffer.slice(start, end + 1);
                let contentRange = 'bytes ' + start + '-' + end + '/' + total;
                writeHeader(res, contentRange, chunk.length);
                res.write(chunk);
                res.end();
            } else {
                if (err) {
                    res.sendStatus(500);
                } else {
                    let contentRange = 'bytes 0-' + totalEnd + '/' + total;
                    writeHeader(res, contentRange, total);
                    res.write(buffer);
                    res.end();
                }
            }
        });
    })
});

export let createAttachmentContent = (file, callback) => {
    zlib.deflate(file.buffer, (err, buffer) => {
        if (!err) {
            file.buffer = buffer;
            attachmentContentRepository.create(file, (err, attachmentContent) => {
                callback(err, attachmentContent);
            })
        } else {
            // handle error
        }
    });

}

export let deleteAttachment = function (exercise, attachment) {
    attachmentContentRepository.findByIdAndRemove(attachment.content, (err) => {
        if (err) {
            console.log('Could not delete file: ' + attachment + ' error:' + err);
        }
    });
};
