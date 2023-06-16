const mongoose = require('mongoose');

const path = require('path');

const reviewSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contry: {
        type: String,
        required: true
    },  
    state: {
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



const review = mongoose.model('review', reviewSchema);
module.exports = review;