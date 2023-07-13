const Student = require('../models/studentModel.js');
const asyncHandler = require("express-async-handler");


/**
 * @route GET request api/students/
 * @description gets all the students
 */
const getStudents = asyncHandler( async(req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
});

/**
 * @route GET request /api/students/:rollno
 * @description gets a single student
 */
const getStudent = asyncHandler( async(req, res) => {
    const student = await Student.find({ rollno: req.params.rollno });
    // if(student != []) {
    //     res.status(404);
    //     throw new Error("Student not Found");
    // }
    res.status(200).json(student);
})

/**
 * @route POST request api/students/
 * @description creates new student
 */
const createStudent = asyncHandler( async(req, res) => {
    console.log(req.body);
    const {name, email, rollno, department} = req.body;
    if(!name || !email || !rollno || !department) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const student = await Student.create({
        name:name,
        email:email,
        rollno:rollno,
        department:department
    });
    res.status(201).json({ message: "created student", addedStudent: student});
})

/**
 * @route PUT request api/students/:rollno
 * @description update a student
 */
const updateStudent = asyncHandler( async(req,res) => {
    const student = await Student.find({ rollno: req.params.rollno });
    // if(student != []) {
    //     res.status(404);
    //     throw new Error("Student not Found");
    // }
    const updatedStudent = await Student.updateOne({ rollno: req.params.rollno },req.body, { new: true });
    res.status(200).json({ message: `update student data with ${req.params.rollno}`, update: updatedStudent });
})

/**
 * @route DELETE request api/student/:rollno
 * @description deletes a student
 */
const deleteStudent = asyncHandler( async(req, res) => {
    const student = await Student.find({ rollno: req.params.rollno });
    // if(!student) {
    //     res.status(404);
    //     throw new Error(" Student Not Found ");
    // }
    await Student.deleteOne({ rollno: req.params.rollno });
    res.status(200).json({ message: "deleted student" , student: student});
});

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent };
