const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const roleSch = require('./roleSchema');
const moduleSch = require('./moduleSchema');
const moduleGroupSch = require('./moduleGroupSchema');
const accessSch = require('./accessSchema');
const roleConfig = require('./roleConfig');
const roleSchema = require('./roleSchema');
const accessSchema = require('./accessSchema');
const moduleSchema = require('./moduleSchema');
const roleController = {};

roleController.GetRoles = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.page && req.query.page == 0) {
      selectQuery = 'role_title description is_active is_deleted';
      const roles = await roleSch.find(searchQuery).select(selectQuery);
      return otherHelper.sendResponse(res, httpStatus.OK, true, roles, null, 'all roles get success!', null);
    }
    if (req.query.find_role_title) {
      searchQuery = { role_title: { $regex: req.query.find_role_title, $options: 'i' }, ...searchQuery };
    }

    if (req.query.is_active) {
      searchQuery = { is_active: true, ...searchQuery };
    }

    let pulledData = await otherHelper.getQuerySendResponse(roleSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, roleConfig.roleGet, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};
roleController.GetRoleDetail = async (req, res, next) => {
  const roles = await roleSch.findById(req.params.id, { is_active: 1, role_title: 1, description: 1 });
  return otherHelper.sendResponse(res, httpStatus.OK, true, roles, null, roleConfig.roleGet, null, 'Role Not Found');
};
roleController.AddRoles = async (req, res, next) => {
  try {
    const role = req.body;
    if (role._id) {
      const update = await roleSch.findByIdAndUpdate(role._id, { $set: role }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, roleConfig.roleSave, null);
    } else {
      role.added_by = req.user.id;
      const newRole = new roleSch(role);
      await newRole.save();
      //create new access with every module
      const all_modules = await moduleSchema.find().select('_id').lean();
      let save = [];
      for (let i = 0; i < all_modules.length; i++) {
        let new_access = {};
        new_access.role_id = newRole._id;
        new_access.module_id = all_modules[i]._id;
        new_access.access_type = [];
        save = [...save, new_access];
      }
      await accessSchema.insertMany(save);
      return otherHelper.sendResponse(res, httpStatus.OK, true, newRole, null, roleConfig.roleSave, null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.DeleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    await accessSchema.updateMany({ role_id: id }, { $set: { is_deleted: true, is_active: false } });
    const deleted = await roleSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date() } });

    return otherHelper.sendResponse(res, httpStatus.OK, true, deleted, null, 'role delete success', null);
  } catch (err) {
    next(err);
  }
};

roleController.GetModule = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, null);
    selectQuery = 'module_name description order path module_group';
    if (req.query.find_module_name) {
      searchQuery = { module_name: { $regex: req.query.find_module_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.server_url) {
      searchQuery = { 'path.server_routes.route': { $regex: req.query.server_url, $options: 'i' }, ...searchQuery };
    }
    if (req.query.client_url) {
      searchQuery = { 'path.admin_routes': { $regex: req.query.client_url, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_module_group) {
      searchQuery2 = { module_group: { $regex: req.query.find_module_group, $options: 'i' } };
      let pulledData = await otherHelper.getQuerySendResponse(moduleGroupSch, page, size, sortQuery, searchQuery2, selectQuery, next, populate);
      const module_id = pulledData.data.map((id) => id._id);
      searchQuery = { ...searchQuery, module_group: { $in: module_id } };
    }
    populate = [
      {
        path: 'module_group',
        select: 'module_group',
        model: 'modulegroups',
      },
    ];
    sortQuery = { module_group: 1, module_name: 1 };
    let pulledData = await otherHelper.getQuerySendResponse(moduleSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, roleConfig.gets, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
  req.query.find_module_group;
};

roleController.GetModuleActive = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, null);
    searchQuery = { ...searchQuery, is_active: true };
    selectQuery = 'module_name description order path module_group';
    if (req.query.find_module_name) {
      searchQuery = { module_name: { $regex: req.query.find_module_name, $options: 'i' }, ...searchQuery };
    }
    populate = [
      {
        path: 'module_group',
        select: 'module_group',
        model: 'modulegroups',
      },
    ];
    sortQuery = { module_group: 1 };
    let pulledData = await otherHelper.getQuerySendResponse(moduleSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, roleConfig.gets, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

roleController.GetModuleDetail = async (req, res, next) => {
  const modules = await moduleSch.findById(req.params.id);
  return otherHelper.sendResponse(res, httpStatus.OK, true, modules, null, roleConfig.moduleGet, null, 'Module Not Found');
};

roleController.GetModuleGroup = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, null);
    if (req.query.find_title) {
      searchQuery = { module_group: { $regex: req.query.find_title, $options: 'i' }, ...searchQuery };
    }
    let pulledData = await otherHelper.getQuerySendResponse(moduleGroupSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, roleConfig.moduleGet, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

roleController.GetModuleGroupDetail = async (req, res, next) => {
  const modules = await moduleGroupSch.findById(req.params.id);
  return otherHelper.sendResponse(res, httpStatus.OK, true, modules, null, roleConfig.moduleGet, null, 'Module Not Found');
};

roleController.AddModuleList = async (req, res, next) => {
  try {
    const modules = req.body;
    if (modules._id) {
      const update = await moduleSch.findByIdAndUpdate(modules._id, { $set: modules }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, roleConfig.moduleSave, null);
    } else {
      modules.added_by = req.user.id;
      const newModules = new moduleSch(modules);
      await newModules.save();

      const all_roles = await roleSchema.find().select('_id').lean();
      let save = [];
      for (let i = 0; i < all_roles.length; i++) {
        let new_access = {};
        new_access.role_id = all_roles[i]._id;
        new_access.module_id = newModules._id;
        new_access.access_type = [];
        save = [...save, new_access];
      }
      await accessSchema.insertMany(save);

      return otherHelper.sendResponse(res, httpStatus.OK, true, newModules, null, roleConfig.moduleSave, null);
    }
  } catch (err) {
    next(err);
  }
};

roleController.AddModuleGroupList = async (req, res, next) => {
  try {
    const moduleGroup = req.body;
    if (moduleGroup._id) {
      const update = await moduleGroupSch.findByIdAndUpdate(moduleGroup._id, { $set: moduleGroup }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, roleConfig.moduleSave, null);
    } else {
      moduleGroup.added_by = req.user.id;
      moduleGroup.is_deleted = false;
      const newModuleGroup = new moduleGroupSch(moduleGroup);
      await newModuleGroup.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newModuleGroup, null, roleConfig.moduleSave, null);
    }
  } catch (err) {
    next(err);
  }
};

roleController.GetAccessList = async (req, res, next) => {
  try {
    const access = await accessSch.find({}, { _id: 1, is_active: 1, access_type: 1, module_id: 1, role_id: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, access, null, roleConfig.accessGet, null, 'Access Not Found');
  } catch (err) {
    next(err);
  }
};

roleController.SaveAccessList = async (req, res, next) => {
  try {
    const access = req.body;
    if (access._id) {
      const update = await accessSch.findByIdAndUpdate(access._id, { $set: access }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, roleConfig.accessSave, null);
    } else {
      access.added_by = req.user.id;
      const newModules = new accessSch(access);
      await newModules.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newModules, null, roleConfig.accessSave, null);
    }
  } catch (err) {
    next(err);
  }
};

roleController.SaveAccessListFromRole = async (req, res, next) => {
  try {
    const roleId = req.params.roleid;
    const access = req.body.Access;
    if (access.length) {
      for (let i = 0; i < access.length; i++) {
        if (access[i]._id) {
          access[i].role_id = roleId;
          await accessSch.findByIdAndUpdate(access[i]._id, { $set: access[i] }, { new: true });
        } else {
          access[i].role_id = roleId;
          access[i].added_by = req.user.id;
          const newAccess = new accessSch(access[i]);
          await newAccess.save();
        }
      }
      return otherHelper.sendResponse(res, httpStatus.OK, false, access, null, roleConfig.accessSave, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_MODIFIED, false, null, 'Nothing to save!', 'Nothing to save!', null);
    }
  } catch (err) {
    next(err);
  }
};

roleController.SaveAccessListForModule = async (req, res, next) => {
  try {
    const moduleId = req.params.moduleid;
    const access = req.body.Access;
    let d = [];
    if (access.length) {
      for (let i = 0; i < access.length; i++) {
        if (access[i]._id) {
          access[i].module_id = moduleId;
          const newAccess = await accessSch.findByIdAndUpdate(access[i]._id, { $set: access[i] }, { new: true });
          d.push(newAccess);
        } else {
          access[i].module_id = moduleId;
          access[i].added_by = req.user.id;
          const newAccess = new accessSch(access[i]);
          const data = await newAccess.save();
          d.push(data);
        }
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, d, null, 'Access update success!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_MODIFIED, true, null, null, 'not found', null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.GetModulesWithHierarchy = async (req, res, next) => {
  try {
    const moduleGroup = await moduleGroupSch.find().select({ module_group: 1, description: 1 }).sort({ order: 1 }).lean();
    const modules = await moduleSch.find().select({ module_name: 1, module_group: 1, 'path.access_type': 1, 'path.access_type_description': 1, 'path._id': 1 }).sort({ order: 1 }).lean();
    let result = [];
    for (let i = 0; i < moduleGroup.length; i++) {
      let d = moduleGroup[i];
      const module_filter = modules.filter((x) => (d._id.toString() == x.module_group ? x.module_group.toString() : ''));
      d.modules = module_filter;
      result.push(d);
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, result, null, '', null);
  } catch (err) {
    next(err);
  }
};
roleController.GetAccessListForRole = async (req, res, next) => {
  try {
    const roleId = req.params.roleid;
    const AccessForRole = await accessSch.find({ role_id: roleId }, { _id: 1, access_type: 1, is_active: 1, module_id: 1, role_id: 1 });
    const Module = await moduleSch.find({}, { _id: 1, module_name: 1, 'path.access_type': 1, 'path._id': 1 });

    let Access = [];
    for (let i = 0; i < Module.length; i++) {
      const one_access = AccessForRole.find((x) => x.module_id.toString() == Module[i]._id.toString());
      if (one_access) {
        Access.push(one_access);
      } else {
        Access.push({ access_type: [], is_active: true, module_id: Module[i]._id, role_id: roleId });
      }
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, { Access: Access }, null, 'Access Get Success !', null);
  } catch (err) {
    next(err);
  }
};
roleController.GetAccessListForModule = async (req, res, next) => {
  try {
    const moduleId = req.params.moduleid;
    const AccessForModule = await accessSch.find({ module_id: moduleId }, { _id: 1, access_type: 1, is_active: 1, module_id: 1, role_id: 1 });
    const ModulesForRole = await moduleSch.findOne({ _id: moduleId }, { _id: 1, module_name: 1, 'path.access_type': 1, 'path._id': 1 });
    const Roles = await roleSch.find({ is_deleted: false }, { _id: 1, role_title: 1, is_active: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { Access: AccessForModule, Module: ModulesForRole, Roles: Roles }, null, roleConfig.accessGet, null);
  } catch (err) {
    next(err);
  }
};

roleController.deleteModuleGroupList = async (req, res, next) => {
  try {
    const moduleGroupId = req.params.id;
    await moduleGroupSch.findByIdAndUpdate(moduleGroupId, { $set: { is_deleted: true, deleted_at: new Date() } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, roleConfig.gModuleDelete, null);
  } catch (err) {
    next(err);
  }
};

roleController.fixRoleModuleAccessProblem = async (req, res, next) => {
  try {
    const all_roles = await roleSchema.find().select('_id').lean();
    const all_modules = await moduleSchema.find().select('_id').lean();
    //delete all accesses which doesnt have roles or roles are deleted
    await accessSchema.deleteMany({ role_id: { $nin: all_roles } });
    let save = [];
    //find if all roles and modules have accesses data, if not create one
    for (let i = 0; i < all_roles.length; i++) {
      for (let j = 0; j < all_modules.length; j++) {
        const all_access = await accessSchema.find({ module_id: all_modules[j]._id, role_id: all_roles[i]._id }).lean();

        if (all_access.length < 1) {
          let new_access = {};
          new_access.role_id = all_roles[i]._id;
          new_access.module_id = all_modules[j]._id;
          new_access.access_type = [];
          save = [...save, new_access];
        }
      }
    }
    await accessSchema.insertMany(save);

    return otherHelper.sendResponse(res, httpStatus.OK, true, save, null, 'Access Fixed', null);
  } catch (err) {
    next(err);
  }
};

roleController.selectMultipleData = async (req, res, next) => {
  const { role_id, type } = req.body;

  if (type == 'is_active') {
    const Data = await roleSch.updateMany({ _id: { $in: role_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await roleSch.updateMany(
      { _id: { $in: role_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    await accessSchema.updateMany({ role_id: role_id }, { $set: { is_deleted: true, is_active: false } });

    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  }
};

module.exports = roleController;
