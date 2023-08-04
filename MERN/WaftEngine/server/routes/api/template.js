const express = require('express');
const router = express.Router();

const validations = require('../../modules/template/templateValidation');
const templateModule = require('../../modules/template/templateController').templateController;
const { authorization, authentication } = require('../../middleware/auth.middleware');

router.get('/', authentication, authorization, templateModule.getTemplateName);
router.get('/:key', authentication, authorization, templateModule.getTemplateDetail);
router.post('/', authentication, authorization, validations.sanitized, validations.validate, templateModule.postTemplate);

module.exports = router;
