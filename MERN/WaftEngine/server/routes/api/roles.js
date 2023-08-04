const express = require('express');
const router = express.Router();

const dModule = require('../../modules/role/roleController');
const validations = require('../../modules/role/roleValidation');
const { authorization, authentication } = require('../../middleware/auth.middleware');

router.get('/role', authentication, authorization, dModule.GetRoles);
router.get('/role/:id', authentication, authorization, dModule.GetRoleDetail);
router.post('/role', authentication, authorization, validations.sanitizeRole, validations.validateRole, dModule.AddRoles);
router.delete('/role/:id', authentication, dModule.DeleteRole);
router.get('/module', authentication, authorization, dModule.GetModule);
router.get('/module/:id', authentication, authorization, dModule.GetModuleDetail);
router.post('/module', authentication, authorization, validations.sanitizeModule, validations.validateModule, dModule.AddModuleList);
router.get('/module-group', authentication, authorization, dModule.GetModuleGroup);
router.get('/module-group/:id', authentication, authorization, dModule.GetModuleGroupDetail);
router.post('/module-group', authentication, authorization, validations.validateModuleGroup, dModule.AddModuleGroupList);
router.get('/access', authentication, authorization, dModule.GetAccessList);
router.post('/access', authentication, authorization, validations.sanitizeAccess, validations.validateAccess, dModule.SaveAccessList);
router.get('/fix-access', authentication, dModule.fixRoleModuleAccessProblem);

/**
 * Access Management of Role to all Module
 */
router.get('/module-hierarchy', authentication, authorization, dModule.GetModulesWithHierarchy);
router.get('/access/role/:roleid', authentication, authorization, dModule.GetAccessListForRole);
router.post('/access/role/:roleid', authentication, authorization, dModule.SaveAccessListFromRole);

/**
 *Access Management of Module to all roles
 */
router.get('/access/module/:moduleid', authentication, authorization, dModule.GetAccessListForModule);
router.post('/access/module/:moduleid', authentication, authorization, dModule.SaveAccessListForModule);

// router.get('/active', authentication, authorization, dModule.GetModuleActive)
// router.delete('/module-group/:id', authentication, authorization, dModule.deleteModuleGroupList)
router.post('/multiple', authentication, authorization, dModule.selectMultipleData);

module.exports = router;
