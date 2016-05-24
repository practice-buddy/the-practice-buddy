import mongoose = require('mongoose');
import {Schema} from "mongoose";

export interface FlashcardGroup extends mongoose.Document {
    flashcards:string[];
}

export let FlashcardGroupSchema = new mongoose.Schema({
    flashcards:[String]
});

