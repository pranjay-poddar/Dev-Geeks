const express = require('express');
const router = express.Router();
const bugModule = require('../../modules/bug/bugController');
const { authentication, authorization } = require('../../middleware/auth.middleware');

router.get('/', authentication, authorization, bugModule.GetErrors);
router.get('/grby', authentication, bugModule.GetErrorsGroupBy);
router.delete('/all', authentication, authorization, bugModule.DeleteAll);
router.delete('/:id', authentication, authorization, bugModule.DeleteError);

module.exports = router;
