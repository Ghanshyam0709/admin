const mongoose = require('mongoose');

const path = require('path');

const postpath = "/uploads/image";

const multer = require('multer');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true
    },
    createdAt:{
        type: String,
        required: true
    },
    updatedAt:{
        type: String,
        required: true
    }


});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '..', postpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

postSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
postSchema.statics.postpath = postpath;

const post = mongoose.model('post', postSchema);
module.exports = post;