import mongoose = require('mongoose');
import {Exercise, repository} from "./exercise";

export interface SimpleExercise extends Exercise {
    text:string;
}

let options = {discriminatorKey: 'type'};

export let simpleRepository = repository.discriminator('SimpleExercise',
    new mongoose.Schema({
        text: String
    }, options));
