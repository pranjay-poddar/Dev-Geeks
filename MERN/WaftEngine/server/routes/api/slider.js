const express = require('express');
const router = express.Router();

const { authorization, authentication } = require('../../middleware/auth.middleware');
const sliderModule = require('../../modules/slider/sliderController');
const validations = require('../../modules/slider/sliderValidations');

router.get('/', authentication, authorization, sliderModule.GetSlider);
router.get('/key/:key', sliderModule.GetSliderByKey);
router.get('/:id', authentication, authorization, sliderModule.GetSliderById);
router.post('/', authentication, authorization, validations.sanitize, validations.validate, sliderModule.SaveSlider);
router.delete('/:id', authentication, authorization, sliderModule.DeleteSlider);

module.exports = router;
