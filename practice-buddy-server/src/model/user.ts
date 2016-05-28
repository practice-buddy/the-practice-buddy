import mongoose = require('mongoose');
import {Schema} from "mongoose";

// todo hash password

export interface User extends mongoose.Document {
    name:string;
    password:string;
    email:string;
}
let UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
});

export let repository = mongoose.model<User>('User', UserSchema);
