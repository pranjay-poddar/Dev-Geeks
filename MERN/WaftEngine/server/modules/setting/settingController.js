const httpStatus = require('http-status');
const settingSch = require('./settingSchema');
const settingConfig = require('./settingConfig');
const otherHelper = require('../../helper/others.helper');
const { getSetting, setSetting } = require('../../helper/settings.helper');
const settingController = {};

settingController.GetSettingAll = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    let admin_role_id = await getSetting('roles', 'admin', 'admin_id');
    let super_admin_role_id = await getSetting('roles', 'super_admin', 'super_admin_id');
    if (req.user.roles.includes(admin_role_id) && !req.user.roles.includes(super_admin_role_id)) {
      searchQuery = { admin: true, ...searchQuery };
    }
    if (req.query.find_type && req.query.find_type != 'all') {
      searchQuery = { type: { $regex: req.query.find_type, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_admin && req.query.find_admin != 'all') {
      searchQuery = { admin: true, ...searchQuery };
    }
    if (req.query.find_key) {
      searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_sub_type && req.query.find_type != 'all' && req.query.find_sub_type != 'all') {
      searchQuery = { sub_type: { $regex: req.query.find_sub_type, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_removable) {
      searchQuery = { is_removable: req.query.find_removable, ...searchQuery };
    }

    sortQuery = { type: 1, sub_type: 1, key: 1 };
    let setting = await otherHelper.getQuerySendResponse(settingSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    if (setting) {
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, setting.data, settingConfig.get, page, size, setting.totalData);
    }
  } catch (err) {
    next(err);
  }
};

settingController.GetSettingType = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, null);

    if (req.query.find_key) {
      searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_value) {
      searchQuery = { value: { $regex: req.query.find_value, $options: 'i' }, ...searchQuery };
    }
    searchQuery = { type: req.params.type, ...searchQuery };

    let setting = await otherHelper.getQuerySendResponse(settingSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, setting.data, settingConfig.get, page, size, setting.totalData);
  } catch (err) {
    next(err);
  }
};
settingController.GetSettingByKey = async (req, res, next) => {
  try {

    const type = req.params.type;
    const subtype = req.params.subtype;
    const key = req.params.key;

    let setting = await getSetting(type, subtype, key);
    if (type == 'Mobile') {
      return otherHelper.sendData(res, httpStatus.OK, true, JSON.parse(setting), null, settingConfig.get, null);
    } else if (key == 'phonecode') {
      return otherHelper.sendResponse(res, httpStatus.OK, true, JSON.parse(setting), null, settingConfig.get, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, true, null, null, settingConfig.errorIn.inputErrors, null);
    }
  } catch (err) {
    next(err);
  }
};
settingController.GetSettingSingle = async (req, res, next) => {
  try {
    settingId = req.params.setting_id;

    let setting = await settingSch.findOne({ _id: settingId });
    return otherHelper.sendResponse(res, httpStatus.OK, true, setting, null, settingConfig.get, null);
  } catch (err) {
    next(err);
  }
};

settingController.SaveSetting = async (req, res, next) => {
  try {
    let data = req.body;
    let admin_role_id = await getSetting('roles', 'admin', 'admin_id');
    let super_admin_role_id = await getSetting('roles', 'super_admin', 'super_admin_id');
    if (data._id) {
      if (req.user.roles.includes(admin_role_id) && !req.user.roles.includes(super_admin_role_id)) {
        data.admin = true;
        delete data.key;
        delete data.type;
        delete data.sub_type;
        delete data.is_active;
        delete data.is_removable;
        delete data.description;
        delete data.value_type;
      }
      data.updated_by = req.user.id;
      setSetting(data.type, data.sub_type, data.key, data.value);
      let updated = await settingSch.findByIdAndUpdate(data._id, { $set: data });
      return otherHelper.sendResponse(res, httpStatus.OK, true, updated, null, settingConfig.save, null);
    } else {
      // if (req.user.roles.includes(admin_role_id) && !req.user.roles.includes(super_admin_role_id)) {
      //   return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'you cannot add any new Settings', null);
      // }
      data.type = req.params.type;
      data.added_by = req.user.id;
      let newSetting = new settingSch(data);
      let saved = await newSetting.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, saved, null, settingConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
settingController.EditSetting = async (req, res, next) => {
  try {
    const data = req.body;
    let allData = [];
    await Promise.all(
      Object.keys(data).map(async (each) => {
        let edited = await settingSch.findOneAndUpdate({ key: each }, { $set: { value: req.body[each].value, updated_at: Date.now(), updated_by: req.user.id } }, { new: true });
        if (edited) {
          allData.push(edited);
        } else {
          const newSetting = new settingSch({ title: each, key: each, value: req.body[each].value, updated_at: Date.now(), added_by: req.user.id });
          const d = await newSetting.save();
          allData.push(d);
        }
      }),
    );

    if (Object.keys(allData).length) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, allData, null, 'settings edit success!', null);
    }
  } catch (err) {
    next(err);
  }
};

settingController.GetAllType = async (req, res, next) => {
  try {
    let setting = ['all'];
    let pulledData = await settingSch.distinct('type');
    let temp = setting.concat(pulledData);
    return otherHelper.sendResponse(res, httpStatus.OK, true, temp, null, 'successful get all type', null);
  } catch (err) {
    next(err);
  }
};

settingController.GetSubTypeByType = async (req, res, next) => {
  try {
    const type = req.params.type;
    var temp;
    let setting = ['all'];
    let pulledData = await settingSch.find({ type: type }).distinct('sub_type');
    temp = setting.concat(pulledData);
    return otherHelper.sendResponse(res, httpStatus.OK, true, temp, null, 'successful get all sub-type', null);
  } catch (err) {
    next(err);
  }
};

settingController.DeleteSettings = async (req, res, next) => {
  try {
    let admin_role_id = await getSetting('roles', 'admin', 'admin_id');
    let super_admin_role_id = await getSetting('roles', 'super_admin', 'super_admin_id');
    const settingId = req.params.id;
    const temp = await settingSch.findOne({ _id: settingId, is_removable: true });
    if (temp && temp._id) {
      if (req.user.roles.includes(admin_role_id) && !req.user.roles.includes(super_admin_role_id)) {
        if (temp.added_by == req.user.id) {
          let error = { admin: 'Cannot delete this setting' };
          return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, error, 'Cannot delete this setting', null);
        }
      }
      const del = await settingSch.findByIdAndUpdate(settingId, { $set: { is_deleted: true } });
      return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'setting delete success!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, true, null, null, 'This setting is not Removable', null);
    }
  } catch (err) {
    next(err);
  }
};

settingController.selectMultipleData = async (req, res, next) => {
  const { setting_id, type } = req.body;
  if (type == 'is_active') {
    const Data = await settingSch.updateMany({ _id: { $in: setting_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  }
};

module.exports = settingController;
