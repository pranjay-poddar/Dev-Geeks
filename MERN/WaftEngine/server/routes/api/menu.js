const express = require('express');
const router = express.Router();

const { menuController, menuItemController } = require('../../modules/menu/menucontroller');
const { sanitize, validate, itemSanitize, itemValidate } = require('../../modules/menu/menuValidation');
const { authentication } = require('../../middleware/auth.middleware');

router.get('/', menuController.getMenu);
router.post('/', sanitize, validate, authentication, menuController.saveMenu);
router.post('/menuitem', itemSanitize, itemValidate, authentication, menuItemController.saveMenuItem);
router.get('/menuitem/:id', authentication, menuItemController.getMenuItem);
router.delete('/menuitem/:id', authentication, menuItemController.deleteMenuItem);
router.get('/detail/:id', menuController.getEditMenu);
router.get('/detailforuser/:key', menuController.getMenuForUser);
router.delete('/:id', authentication, menuController.deleteMenu);
router.post('/multiple', authentication, menuController.selectMultipleData);

module.exports = router;
