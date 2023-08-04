const express = require('express');
const router = express.Router();
const uploadHelper = require('../../helper/upload.helper')

const dModule = require('../../modules/media/mediaController');
const { authorization, authentication } = require('../../middleware/auth.middleware');

router.get('/', authentication, authorization, dModule.GetMediaPagination);
router.post('/single/:type', authentication, authorization, uploadHelper.uploadFiles('public/media/', 'single', 'file'), dModule.SaveMedia);
router.post('/multiple/:type', authentication, authorization, uploadHelper.uploadFiles('public/media/', 'any', 'file'), dModule.SaveMultipleMedia);
router.get('/:id', dModule.GetMediaDetail);
router.delete('/:id', authentication, authorization, dModule.DeleteMedia);
router.post('/uploader', authentication, authorization, uploadHelper.uploadFiles('public/media/', 'any', 'file'), dModule.UploadFromCkEditor);
router.post('/deleteall', authentication, authorization, dModule.DeleteAllMedia);

module.exports = router;

