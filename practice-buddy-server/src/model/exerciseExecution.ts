import mongoose = require('mongoose');

export interface ExerciseExecution {
    _id?;
    date:String;
    personalPerformanceRating:number;
}

export let ExerciseExecutionSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    personalPerformanceRating: Number
});

