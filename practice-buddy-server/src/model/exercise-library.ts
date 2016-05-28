import mongoose = require('mongoose');
import {Schema} from "mongoose";
import {User} from "./user";
import {Exercise} from "./exercise";

export interface ExerciseLibrary extends mongoose.Document {
    owner:User;
    exercises: Exercise[]

}
let ExerciseLibrarySchema = new mongoose.Schema({
    owner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}],

});

export let repository = mongoose.model<ExerciseLibrary>('ExerciseLibrary', ExerciseLibrarySchema);
