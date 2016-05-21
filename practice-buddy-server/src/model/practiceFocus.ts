import mongoose = require('mongoose');
import {Schema} from "mongoose";
import {Exercise} from "./exercise";

export interface PracticeFocus extends mongoose.Document {
    title:string;
    exercises:Exercise[];
}

let PracticeFocusSchema = new mongoose.Schema({
    title: {type: String, required: true},
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
});

export let repository = mongoose.model<PracticeFocus>('PracticeFocus', PracticeFocusSchema);