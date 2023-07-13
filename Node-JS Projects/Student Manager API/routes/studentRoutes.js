const router = require('express').Router();
const { getStudents, getStudent, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

router.route('/').get(getStudents);
router.route('/').post(createStudent);
router.route('/:rollno').get(getStudent);
router.route('/:rollno').put(updateStudent);
router.route('/:rollno').delete(deleteStudent);



module.exports = router;