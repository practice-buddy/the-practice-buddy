import mongoose = require('mongoose');
import {Exercise, repository} from "./exercise";
import {FlashcardGroup, FlashcardGroupSchema} from "./flashcardGroup";
import {Schema} from "mongoose";

export interface FlashcardExercise extends Exercise {
    flashcardGroups: FlashcardGroup[];
}

let options = {discriminatorKey: 'type'};

let FlashcardExerciseSchema = new mongoose.Schema({
    flashcardGroups: [FlashcardGroupSchema]
}, options);

export let flashcardRepository = repository.discriminator('FlashcardExercise', FlashcardExerciseSchema);
