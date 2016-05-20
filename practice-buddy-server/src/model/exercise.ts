import mongoose = require('mongoose');

export interface Exercise extends mongoose.Document {
    title:string;
    labels:string[];
}
var options = {discriminatorKey: 'type'};

let ExerciseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    labels: [String]
}, options);

export let repository = mongoose.model<Exercise>('Exercise', ExerciseSchema);
