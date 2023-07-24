const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const templateConfig = require('./templateConfig');
const templateSch = require('./templateSchema');
const templateValidation = {};

templateValidation.sanitized = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'template_name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'template_key',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'information',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'variables',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'from',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'subject',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'body',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'alternative_text',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

templateValidation.validate = async (req, res, next) => {
  const data = req.body
  const validateArray = [
    {
      field: '_id',
      validate: [
        {
          condition: 'IsMongoId',
          msg: templateConfig.validate.isMongoID,
        },
      ],
    },
    {
      field: 'template_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength50,
          option: { min: 2, max: 50 },
        },
      ],
    },
    {
      field: 'template_key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength50,
          option: { min: 2, max: 50 },
        },
        {
          condition: 'IsProperKey',
          msg: 'not Valid Input',
        },
      ],
    },
    {
      field: 'information',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength300,
          option: { min: 2, max: 300 },
        },
      ],
    },
    {
      field: 'variables',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
      ],
    },
    {
      field: 'from',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength50,
          option: { min: 2, max: 50 },
        },
      ],
    },
    {
      field: 'subject',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength,
          option: { min: 2, max: 300 },
        },
      ],
    },
    {
      field: 'body',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength,
          option: { min: 2 },
        },
      ],
    },
    {
      field: 'alternate_text',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength,
          option: { min: 2 },
        },
      ],
    },
  ];
  let errors = validateHelper.validation(req.body, validateArray);

  let key_filter = { is_deleted: false, template_key: data.template_key }
  if (data._id) {
    key_filter = { ...key_filter, _id: { $ne: data._id } }
  }
  const already_key = await templateSch.findOne(key_filter);
  if (already_key && already_key._id) {
    errors = { ...errors, template_key: 'template_key already exist' }
  }


  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, templateConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};

module.exports = templateValidation;
