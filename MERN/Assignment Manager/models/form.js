const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    singlefileid: {
        type: String
    },
    multiplefilesid: {
        type: String
    }

}, {timestamps: true});

module.exports = mongoose.model('Form', formSchema);