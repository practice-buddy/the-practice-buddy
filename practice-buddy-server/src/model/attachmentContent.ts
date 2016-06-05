import mongoose = require('mongoose');

export interface AttachmentContent {
    _id?;
    mimetype:string;
    buffer:any;
}

let AttachmentContentSchema = new mongoose.Schema({
    mimetype:String,
    buffer: Buffer
});

export let repository = mongoose.model<AttachmentContent>('AttachmentContent', AttachmentContentSchema);
