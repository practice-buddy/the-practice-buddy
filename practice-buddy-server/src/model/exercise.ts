import mongoose = require('mongoose');
import {ExerciseExecution, ExerciseExecutionSchema} from "./exerciseExecution";
import {Schema} from "mongoose";
import {ExerciseAttachmentSchema, ExerciseAttachment} from "./exerciseAttachment";

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
    executions: [ExerciseExecutionSchema],
    attachments: [ExerciseAttachmentSchema]
}, options);

export let repository = mongoose.model<Exercise>('Exercise', ExerciseSchema);
