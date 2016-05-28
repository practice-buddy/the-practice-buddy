import mongoose = require('mongoose');

export interface AttachmentContent {
    _id?;
    buffer:any;
}

let AttachmentContentSchema = new mongoose.Schema({
    buffer: Buffer
});

export let repository = mongoose.model<AttachmentContent>('AttachmentContent', AttachmentContentSchema);
