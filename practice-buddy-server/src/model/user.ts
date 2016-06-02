import mongoose = require('mongoose');
import {Schema} from "mongoose";

export interface User extends mongoose.Document {
    name:string;
    password:string;
    email:string;
}
let UserSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    password: {type: String, unique: true},
    email: {type: String, unique: true},
});

export let repository = mongoose.model<User>('User', UserSchema);
