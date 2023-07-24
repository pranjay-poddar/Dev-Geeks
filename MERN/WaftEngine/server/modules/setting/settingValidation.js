const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const httpStatus = require('http-status');
const settingConfig = require('./settingConfig');
const settingSch = require('./settingSchema');
const settingValidation = {};

settingValidation.validate = async (req, res, next) => {
  const data = req.body;
  const type = req.params.type
  const validateArray = [
    {
      field: 'key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: settingConfig.validate.empty,
        },
        {
          condition: 'IsProperKey',
          msg: 'not Valid Input',
        },
      ],
    },
    {
      field: 'value_type',
      validate: [
        {
          condition: 'IsEmpty',
          msg: settingConfig.validate.empty,
          option: ['Boolean', 'Free text', 'Number', 'ck_editor', 'Array', 'json'],
        }
      ],
    },
  ]
  let errors = validateHelper.validation(data, validateArray);

  let key_filter = { is_deleted: false, sub_type: data.sub_type, type: type, key: data.key }
  if (data._id) {
    key_filter = { ...key_filter, type: type, sub_type: data.sub_type, _id: { $ne: data._id } }
  }
  const already_key = await settingSch.findOne(key_filter);
  if (already_key && already_key._id) {
    errors = { ...errors, key: 'key already exist' }
  }

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, settingConfig.errorIn.inputErrors, null);
  } else {
    return next();
  }
};

settingValidation.sanitize = async (req, res, next) => {
  await sanitizeHelper.sanitize(req, [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'key',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};

module.exports = settingValidation;
