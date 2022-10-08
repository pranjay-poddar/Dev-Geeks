const express = require('express');
const { upload } = require('../helpers/filehelper');
const { singleFileUpload, multipleFileUpload } = require('../controllers/fileuploaderController');
const { getFormData, saveFormData } = require('../controllers/userdata.js');
const router = express.Router();

router.post('/getFormData', getFormData);
router.post('/saveFormData', saveFormData);
router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);

module.exports = {
    routes: router
}