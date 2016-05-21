import mongoose = require('mongoose');

export interface ExerciseExecution {
    _id?;
    date:String;
    personalPerformanceRating:number;
}

let ExerciseExecutionSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    personalPerformanceRating: Number
});

export let repository = mongoose.model<ExerciseExecution>('ExerciseExecution', ExerciseExecutionSchema);
