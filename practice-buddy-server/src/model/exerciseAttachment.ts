import mongoose = require('mongoose');
import {Schema} from "mongoose";
import {AttachmentContent} from "./attachmentContent";

export interface ExerciseAttachment {
    _id?: string;
    mimetype:string;
    name:string;
    content:AttachmentContent;
    // transient
    url: string;
}

export let ExerciseAttachmentSchema = new mongoose.Schema({
    mimetype: {type: String, required: true},
    name: {type: String, required: true},
    content: {type: Schema.Types.ObjectId, ref: 'AttachmentContent', required: true}
});

