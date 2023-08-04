const express = require('express');
const router = express.Router();
const uploadHelper = require('../../helper/upload.helper');
const filesValidation = require('./../../modules/files/filesValidation');
const dModule = require('../../modules/files/filesController');
const { authentication } = require('../../middleware/auth.middleware');

router.get('/folder/:id', authentication, dModule.GetFileAndFolder);
router.post('/folder/:id', authentication, filesValidation.validate, dModule.AddFolders);
router.post('/file/:folder_id', authentication, filesValidation.validateRootFolder, uploadHelper.uploadFiles('public/files/', 'any', 'file'), dModule.UploadFiles);
router.post('/rename/file', authentication, dModule.RenameFolder);
router.post('/file/type/:type', authentication, filesValidation.validateRootFolder, uploadHelper.uploadFiles('public/files/', 'any', 'file'), dModule.UploadFilesToRoot);
router.delete('/folder/:id', authentication, dModule.DeleteFolder);
router.delete('/file/:id', authentication, dModule.DeleteFile);

module.exports = router;
