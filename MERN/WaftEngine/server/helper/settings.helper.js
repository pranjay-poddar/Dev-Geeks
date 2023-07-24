const settingSch = require('../modules/setting/settingSchema');

module.exports.getSetting = async (type, sub_type, key) => {
  try {
    const temp = 'global_' + type.trim() + '_' + sub_type.trim() + '_' + key.trim();
    if (temp) {
      let value = process.env[temp];
      if (value == undefined) {
        const setting = await settingSch.findOne({ key: key, type: type, sub_type: sub_type, is_deleted: false }, { value: 1, key: 1, _id: 0 }).lean();
        if (setting) {
          process.env[temp] = JSON.stringify(setting.value);
          value = process.env[temp];
        } else {
          value = null;
        }
      }
      value = JSON.parse(value);
      return value;
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.setSetting = (type, sub_type, key, value) => {
  try {
    const temp = 'global_' + type.trim() + '_' + sub_type.trim() + '_' + key.trim();
    process.env[temp] = JSON.stringify(value);
    return null;
  } catch (err) {
    console.log(err);
  }
};
module.exports.initSettings = async () => {
  try {
    const s = await settingSch.find({ is_deleted: false }, { value: 1, type: 1, sub_type: 1, key: 1, _id: 0 }).sort({ type: 1, sub_type: 1, key: 1 }).lean();
    for (let i = 0; i < s.length; i++) {
      process.env[`global_${s[i].type.trim()}_${s[i].sub_type.trim()}_${s[i].key.trim()}`] = JSON.stringify(s[i].value);
    }
    console.log('| Global Setting Loaded');
    console.log('|--------------------------------------------');
    return;
  } catch (err) {
    console.log(err);
  }
};
