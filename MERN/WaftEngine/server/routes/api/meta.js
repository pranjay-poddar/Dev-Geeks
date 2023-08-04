const express = require('express');
const router = express.Router();
const uploadHelper = require('../../helper/upload.helper');

const metaModule = require('../../modules/meta/metaController');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const validations = require('./../../modules/meta/metaValidation');

router.get('/', authentication, metaModule.getAllMeta);
router.get('/:id', authentication, metaModule.getDetail);
router.get('/route/*', metaModule.getByRoute);
router.post('/', authentication, authorization, uploadHelper.uploadFiles('public/meta/', 'single', 'file'), validations.Sanitized, validations.Validate, metaModule.saveMeta);
router.delete('/:id', authentication, authorization, metaModule.delete);

module.exports = router;
