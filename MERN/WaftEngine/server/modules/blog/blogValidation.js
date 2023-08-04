const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const blogConfig = require('./blogConfig');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const categorySch = require('./categorySchema');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
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

validation.validate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: blogConfig.validate.titleLength,
          options: {
            min: 3,
            max: 100,
          },
        },
      ],
    },
    {
      field: 'category',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
      ],
    },
    {
      field: 'image',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: blogConfig.validate.descriptionLength,
          options: {
            min: 5,
            max: 2000,
          },
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, blogConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};
validation.catSanitize = (req, res, next) => {
  sanitizeHelper.sanitize(req, [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'order',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};
validation.catValidate = async (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: blogConfig.validate.titleLength,
          options: {
            min: 3,
            max: 100,
          },
        },
      ],
    },
    {
      field: 'slug_url',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
        {
          condition: 'IsProperKey',
          msg: 'not Valid Input',
        },
      ],
    },
    {
      field: 'image',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsLength',
          msg: blogConfig.validate.descriptionLength,
          options: {
            min: 3,
            max: 100,
          },
        },
      ],
    },
    {
      field: 'order',
      validate: [
        {
          condition: 'IsInt',
          msg: blogConfig.validate.isInt,
        },
      ],
    },
  ];
  let errors = validateHelper.validation(data, validateArray);
  let slug_url_filter = { is_deleted: false, slug_url: data.slug_url };
  if (data._id) {
    slug_url_filter = { ...slug_url_filter, _id: { $ne: data._id } };
  }
  const already_slug_url = await categorySch.findOne(slug_url_filter);
  if (already_slug_url && already_slug_url._id) {
    errors = { ...errors, slug_url: 'slug_url already exist' };
  }
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, blogConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};

validation.countSanitize = (req, res, next) => {
  sanitizeHelper.sanitize(req, [
    {
      field: 'blog_id',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'count',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};
validation.countValidate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'count',
      validate: [
        {
          condition: 'IsInt',
          msg: blogConfig.validate.isInt,
        },
      ],
    },
    {
      field: 'blog_id',
      validate: [
        {
          condition: 'IsMongoId',
          msg: blogConfig.validate.isMongoId,
        },
      ],
    },
  ];

  const errors = validateHelper.validation(data, validateArray);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, blogConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};
module.exports = validation;
