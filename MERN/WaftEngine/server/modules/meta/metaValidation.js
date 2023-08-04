const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const metaConfig = require('./metaConfig');
const metaValidation = {};

metaValidation.Sanitized = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'client_route',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

metaValidation.Validate = (req, res, next) => {
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: metaConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          option: { min: 3 },
          msg: metaConfig.validate.descLength,
        },
      ],
    },
    {
      field: 'client_route',
      validate: [
        {
          condition: 'IsEmpty',
          msg: metaConfig.validate.empty,
        },
      ],
    },
    {
      field: 'meta_description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: metaConfig.validate.empty,
        },
      ],
    },
    {
      field: 'meta_keywords',
      validate: [
        {
          condition: 'IsEmpty',
          msg: metaConfig.validate.empty,
        },
      ],
    },
  ];
  const errors = validateHelper.validation(req.body, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, metaConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};

module.exports = metaValidation;
