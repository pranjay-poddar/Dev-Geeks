const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const subscribeSch = require('./subscribeSchema');
const validations = {};

validations.sanitize = (req, res, next) => {
  sanitizeHelper.sanitize(req, [
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};
validations.validate = async (req, res, next) => {
  const data = req.body
  const validateArray = [
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: 'This field is required',
        },
        {
          condition: 'IsLength',
          msg: 'This field length should be between 5 to 500',
          option: {
            min: 5,
            max: 500,
          },
        },
        {
          condition: 'IsEmail',
          msg: 'This field should be email type',
        },
      ],
    },
  ]

  let errors = validateHelper.validation(data, validateArray);
  let subscribe_filter = { is_deleted: true, email: data.email }

  const already_subscribe = await subscribeSch.findOne(subscribe_filter);

  if (already_subscribe && already_subscribe._id) {
    errors = { ...errors, subscribe: 'You cannot subscribe anymore' }
  }
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};
module.exports = validations;
