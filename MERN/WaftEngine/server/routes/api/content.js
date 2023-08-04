const express = require('express');
const router = express.Router();

const contentValidation = require('./../../modules/content/contentValidation');
const dModule = require('../../modules/content/contentController');
const { authentication, authorization } = require('../../middleware/auth.middleware');

router.get('/', authentication, authorization, dModule.GetContent);
router.post('/', authentication, authorization, contentValidation.sanitize, contentValidation.validation, dModule.SaveContent);
router.get('/:id', authentication, authorization, dModule.GetContentDetail);
router.get('/key/:key', dModule.GetContentByKey);
router.delete('/:id', authentication, authorization, dModule.DeleteContent);
router.post('/multiple', authentication, authorization, dModule.selectMultipleData);

module.exports = router;
