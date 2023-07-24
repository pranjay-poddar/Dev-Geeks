const express = require('express');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const router = express.Router();
const adminDashboardController = require('./../../modules/adminDashboard/adminDashboardController');

router.get('/info', adminDashboardController.getWaftEngineInfo);
router.get('/error', authentication, authorization, adminDashboardController.GetErrorsGroupBy);
router.get('/user/days/:day', authentication, authorization, adminDashboardController.getLastXDayUserRegistration);
router.get('/user/registration', authentication, authorization, adminDashboardController.getNoOfCustomerByRegistration);
router.get('/user/recent', authentication, authorization, adminDashboardController.getLatestFiveUsers);
router.get('/user/roles', authentication, authorization, adminDashboardController.GetAllUserGroupBy);
router.get('/user/blogs', authentication, authorization, adminDashboardController.getNoOfBlogByBlogWriter);

module.exports = router;
