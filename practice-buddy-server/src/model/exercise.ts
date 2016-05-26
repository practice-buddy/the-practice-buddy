import mongoose = require('mongoose');
import {ExerciseExecution} from "./exerciseExecution";
import {Schema} from "mongoose";
import {ExerciseAttachment} from "./exerciseAttachment";
import {ExerciseAttachmentSchema} from "./exerciseAttachment";

export interface Exercise extends mongoose.Document {
    title:string;
    labels:string[];
    executions: ExerciseExecution[];
    attachments: ExerciseAttachment[];
}
var options = {discriminatorKey: 'type'};

let ExerciseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    labels: [String],
    executions: [{type: Schema.Types.ObjectId, ref: 'ExerciseExecution'}],
    attachments: [ExerciseAttachmentSchema]
}, options);

export let repository = mongoose.model<Exercise>('Exercise', ExerciseSchema);
