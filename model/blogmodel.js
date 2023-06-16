const mongoose = require('mongoose');

const path = require('path');

const blogpath = "/uploads/image";

const multer = require('multer');

const blogSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    content: {
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
        cd(null, path.join(__dirname, '..', blogpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

blogSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
blogSchema.statics.blogpath = blogpath;

const blog = mongoose.model('blog', blogSchema);
module.exports = blog;