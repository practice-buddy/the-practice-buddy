import mongoose = require('mongoose');
import {ExerciseExecution} from "./exerciseExecution";
import {Schema} from "mongoose";

export interface Exercise extends mongoose.Document {
    title:string;
    labels:string[];
    executions: ExerciseExecution[];
}
var options = {discriminatorKey: 'type'};

let ExerciseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    labels: [String],
    executions: [{type: Schema.Types.ObjectId, ref: 'ExerciseExecution'}]
}, options);

export let repository = mongoose.model<Exercise>('Exercise', ExerciseSchema);
