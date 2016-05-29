import mongoose = require('mongoose');
import {Schema} from "mongoose";
import {Exercise} from "./exercise";

export interface PracticeFocus extends mongoose.Document {
    title:string;
    exercises:Exercise[];
}

export let PracticeFocusSchema = new mongoose.Schema({
    title: {type: String, required: true},
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
});

