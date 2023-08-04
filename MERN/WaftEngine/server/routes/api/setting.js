const express = require('express');
const router = express.Router();
const settingModule = require('../../modules/setting/settingController');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const validation = require('./../../modules/setting/settingValidation')

router.get('/all', authentication, authorization, settingModule.GetSettingAll);
router.get('/type/:type', authentication, authorization, settingModule.GetSettingType);
router.get('/single/:setting_id', authentication, authorization, settingModule.GetSettingSingle);
// router.post('/edit/all', authentication, authorization, settingModule.EditSetting);
router.post('/:type', authentication, authorization, validation.validate, settingModule.SaveSetting);
router.get('/all/type', authentication, settingModule.GetAllType);
router.get('/all/subtype/:type', authentication, settingModule.GetSubTypeByType);
router.delete('/delete/:id', authentication, authorization, settingModule.DeleteSettings)
router.post('/multiple', authentication, authorization, settingModule.selectMultipleData);


module.exports = router;
