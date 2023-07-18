const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the student name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email"],
    },
    rollno: {
        type: String,
        required: [true, "Please add the Roll Number"],
    },
    department: {
        type: String,
        required: [true, "Please add the department"],
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Student', StudentSchema);

