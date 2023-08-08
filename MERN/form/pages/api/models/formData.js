// models/FormData.js
import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    regNum: {
        type: String,
        required: true,
        unique: true,
    },
    phNum: {
        type: Number,
        required: true,
        unique: true,
    },
    isUPI: {
        type: Boolean,
        required: true,
    },
    isBank: {
        type: Boolean,
        required: true,
    },
    UPIID: {
        type: String,
    },
    QRCode: {
        type: String,
    },
    accNum: {
        type: Number,
    },
    IFSCNum: {
        type: String,
    },
    nameAccNum:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now(),
        required: true
    }
});

const FormData = mongoose.models.FormData || mongoose.model('FormData', formDataSchema);

export default FormData;