const express = require('express');
const router = express.Router();

const validations = require('../../modules/subscribe/subscribeValidation');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const subscribeModule = require('../../modules/subscribe/subscribeController');

router.get('/', authentication, authorization, subscribeModule.GetSubscribe);
router.get('/:id', authentication, authorization, subscribeModule.GetSubscribeById);
router.post('/', validations.sanitize, validations.validate, subscribeModule.SaveSubscribe);
router.delete('/:id', authentication, authorization, subscribeModule.DeleteSubscribe);

module.exports = router;
