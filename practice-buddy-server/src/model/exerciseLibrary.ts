import mongoose = require('mongoose');
import {Schema} from "mongoose";
import {User} from "./user";
import {Exercise} from "./exercise";
import {PracticeFocus} from "./practiceFocus";
import {PracticeFocusSchema} from "./practiceFocus";

export interface ExerciseLibrary extends mongoose.Document {
    owner:User;
    exercises: Exercise[];
    practiceFocuses: PracticeFocus[]

}
let ExerciseLibrarySchema = new mongoose.Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User', unique: true},
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}],
    practiceFocuses: [PracticeFocusSchema]

});

export let repository = mongoose.model<ExerciseLibrary>('ExerciseLibrary', ExerciseLibrarySchema);
