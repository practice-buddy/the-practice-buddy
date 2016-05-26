import mongoose = require('mongoose');
import {Schema} from "mongoose";
import {AttachmentContent} from "./attachmentContent";

export interface ExerciseAttachment {
    _id?;
    mimetype:String;
    name:String;
    content:AttachmentContent;
}

export let ExerciseAttachmentSchema = new mongoose.Schema({
    mimetype: {type: String, required: true},
    name: {type: String, required: true},
    content: {type: Schema.Types.ObjectId, ref: 'AttachmentContent'}
});

