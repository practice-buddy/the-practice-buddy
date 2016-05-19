import mongoose = require('mongoose');

let SimpleExerciseSchema = new mongoose.Schema({
    title: {type: String},
    text: String
});

let SimpleExercise = mongoose.model('SimpleExercise', SimpleExerciseSchema);
module.exports = SimpleExercise;