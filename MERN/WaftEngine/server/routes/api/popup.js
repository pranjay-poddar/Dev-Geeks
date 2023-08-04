const express = require('express');
const router = express.Router();

const popUpModule = require('../../modules/popup/popupController');
const popUpValidation = require('../../modules/popup/popupValidation');
const { authentication, authorization } = require('../../middleware/auth.middleware');

router.get('/', authentication, /* authorization,  */ popUpModule.getPopup);
router.post('/', authentication, /* authorization,  */ popUpValidation.sanitize, popUpValidation.validation, popUpModule.SavePopup);
router.get('/:id', /* authorization, */ popUpModule.getPopupDetail);

router.delete('/:id', authentication, /* authorization, */ popUpModule.DeletePopup);

module.exports = router;
