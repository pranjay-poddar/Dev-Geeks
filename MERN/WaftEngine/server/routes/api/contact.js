const express = require('express');
const router = express.Router();

const contModule = require('../../modules/contactUs/contactController');
const { authorization, authentication } = require('../../middleware/auth.middleware');
const { sanitize, validate } = require('../../modules/contactUs/contactValidation');

router.get('/', authentication, authorization, contModule.GetContact);
router.get('/:id', authentication, authorization, contModule.GetContactById);
router.post('/', sanitize, validate, contModule.PostContact);
router.delete('/:id', authentication, authorization, contModule.DeleteContact);

module.exports = router;
