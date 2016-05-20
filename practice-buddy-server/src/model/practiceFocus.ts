import mongoose = require('mongoose');
import {Schema} from "mongoose";
import {SimpleExercise} from "./exercise";

export interface PracticeFocus extends mongoose.Document {
    title:string;
    exercises:SimpleExercise[];
}

let PracticeFocusSchema = new mongoose.Schema({
    title: {type: String, required: true},
    exercises: [{type: Schema.Types.ObjectId, ref: 'SimpleExercise'}]
});

export let repository = mongoose.model<PracticeFocus>('PracticeFocus', PracticeFocusSchema);