const mongoose = require('mongoose');

const path = require('path');

const commentpath = "/uploads/image";

const multer = require('multer');

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },  
    email: {
        type: String,
        required: true
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '..', commentpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

commentSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
commentSchema.statics.commentpath = commentpath;

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;