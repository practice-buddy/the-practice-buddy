import mongoose = require('mongoose');

export interface SimpleExercise extends mongoose.Document {
    title:string;
    text:string;
}

let SimpleExerciseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    text: String
});

export let repository = mongoose.model<SimpleExercise>('SimpleExercise', SimpleExerciseSchema);