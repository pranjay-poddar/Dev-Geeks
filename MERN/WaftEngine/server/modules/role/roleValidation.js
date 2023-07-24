const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const config = require('./roleConfig');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const roleConfig = require('./roleConfig');
const moduleGroupSch = require('./moduleGroupSchema');
const moduleAccessSch = require('./moduleSchema');
const roleSch = require('./roleSchema');
const validations = {};

validations.validateRole = async (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'role_title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.rolesLength,
          option: { min: 2, max: 20 },
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.descriptionLength,
          option: { min: 5, max: 200 },
        },
      ],
    },
  ];
  let errors = validateHelper.validation(data, validationArray);

  let role_filter = { is_deleted: false, role_title: data.role_title };
  if (data._id) {
    role_filter = { ...role_filter, _id: { $ne: data._id } };
  }
  const already_role = await roleSch.findOne(role_filter);
  if (already_role && already_role._id) {
    errors = { ...errors, role_title: 'role already exist' };
  }

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, roleConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};

validations.validateModule = async (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'module_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.rolesLength,
          option: { min: 2, max: 20 },
        },
      ],
    },
    {
      field: 'order',
      validate: [
        {
          condition: 'IsInt',
          msg: config.validate.isInt,
        }
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.descriptionLength,
          option: { min: 5, max: 200 },
        },
      ],
    },
  ];
  let errors = validateHelper.validation(data, validateArray);
  let key_filter = { is_deleted: false, module_name: data.module_name };
  if (data._id) {
    key_filter = { ...key_filter, _id: { $ne: data._id } };
  }
  const already_key = await moduleAccessSch.findOne(key_filter);
  if (already_key && already_key._id) {
    errors = { ...errors, module_name: 'module_name already exist' };
  }

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, roleConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};
validations.validateAccess = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'module_id',
      validate: [
        {
          condition: 'IsMongoId',
          msg: config.validate.isMongo,
        },
      ],
    },
    {
      field: 'role_id',
      validate: [
        {
          condition: 'IsMongoId',
          msg: config.validate.isMongo,
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, nul, errors, 'invalid object id', null);
  } else {
    next();
  }
};
validations.validateModuleGroup = async (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'module_group',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.descriptionLength,
          option: { min: 5, max: 200 },
        },
      ],
    },
  ];
  let errors = validateHelper.validation(data, validateArray);
  let key_filter = { is_deleted: false, module_group: data.module_group };
  if (data._id) {
    key_filter = { ...key_filter, _id: { $ne: data._id } };
  }
  const already_key = await moduleGroupSch.findOne(key_filter);
  if (already_key && already_key._id) {
    errors = { ...errors, module_group: 'module_group already exist' };
  }

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, roleConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};
validations.sanitizeRole = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'role_title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'description',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeModule = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'module_name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'description',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

validations.sanitizeModuleGroup = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'module_group',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'description',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

validations.sanitizeAccess = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'module_id',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'role_id',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
module.exports = validations;
