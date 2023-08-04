const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const popupConfig = require('./popupConfig');
const popupSch = require('./popupSchema');

const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const popupValidation = {};
const internal = {};


popupValidation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'display_target',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'message',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
popupValidation.validation = async (req, res, next) => {
  const data = req.body;
  let errors = {};
  const mainErrors = internal.validateMainData(data ? data : {});
  errors = mainErrors ? mainErrors : {};
  const templateRequirementError = internal.templateRequirementData(data && data.templateRequirement ? data.templateRequirement : {}, data && data.template ? data.template : 'single_image');
  if (templateRequirementError) errors = { templateRequirement: templateRequirementError, ...errors };

  if (!errors.key && !data._id) {
    let isKey = await popupSch.findOne({ key: data.key }).select('_id');
    if (isKey) {
      errors.key = 'Enter unique key'
    }
  }
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};
internal.validateMainData = (data) => {
  let errors = {};
  let validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: popupConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: popupConfig.validation.nameLength,
        },
      ],
    },
    {
      field: 'template',
      validate: [
        {
          condition: 'IsEmpty',
          msg: popupConfig.validation.empty,
        },
        {
          condition: 'IsIn',
          msg: popupConfig.validation.invalid,
          option: ['single_image', 'use_slider', 'show_img_one_by_one', 'ck_editor'],
        },
      ],
    },
    // {
    //   field: 'display_target',
    //   validate: [
    //     {
    //       condition: 'IsEmpty',
    //       msg: popupConfig.validation.empty,
    //     },
    //     {
    //       condition: 'IsIn',
    //       msg: popupConfig.validation.invalid,
    //       option: ['popup_in_slider', 'one_by_one', 'homepage_only', 'overall_page', 'according_to_date'],
    //     },
    //   ],
    // },
    {
      field: 'templateRequirement',
      validate: [
        {
          condition: 'IsEmpty',
          msg: popupConfig.validation.empty,
        },
      ],
    },

  ];
  errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};
internal.templateRequirementData = (data, template) => {
  let errors = {};
  if (Array.isArray(data)) {
    if (template == 'single_image') {
      if (data && data.length > 1) {
        errors = 'cannot add more than a image';
      }
    }
    data.map((eachData) => {
      const templateRequirementErr = internal.validData(eachData, template);
      if (templateRequirementErr) errors = templateRequirementErr;
    });
  } else {
    errors = '[Need Array of object]';
  }
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};
internal.validData = (data, template) => {
  let templateValidate = [];
  if (template == 'ck_editor') {
    templateValidate.push({
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: popupConfig.validation.empty,
        },
      ],
    });
  }
  if (template == 'single_image') {
    templateValidate.push({
      field: 'image',
      validate: [
        {
          condition: 'IsEmpty',
          msg: popupConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: popupConfig.validation.invalid,
        },
      ],
    });
  }
  if (template == 'use_slider' || template == 'show_img_one_by_one') {
    templateValidate = [
      {
        field: 'image',
        validate: [
          {
            condition: 'IsEmpty',
            msg: popupConfig.validation.empty,
          },
          {
            condition: 'IsMongoId',
            msg: popupConfig.validation.invalid,
          },
        ],
      },
      // {
      //   field: 'link',
      //   validate: [
      //     {
      //       condition: 'IsEmpty',
      //       msg: popupConfig.validation.empty,
      //     },
      //     {
      //       condition: 'IsUrl',
      //       msg: popupConfig.validation.invalid,
      //     },
      //   ],
      // },
      // {
      //   field: 'caption',
      //   validate: [
      //     {
      //       condition: 'IsEmpty',
      //       msg: popupConfig.validation.empty,
      //     },
      //     {
      //       condition: 'IsLength',
      //       msg: popupConfig.validation.nameLength,
      //     },
      //   ],
      // },
      {
        field: 'start_date',
        validate: [
          {
            condition: 'IsEmpty',
            msg: popupConfig.validation.empty,
          },
          {
            condition: 'IsDate',
            msg: popupConfig.validation.isDate,
          },
        ],
      },
      {
        field: 'end_date',
        validate: [
          {
            condition: 'IsEmpty',
            msg: popupConfig.validation.empty,
          },
          {
            condition: 'IsDate',
            msg: popupConfig.validation.isDate,
          },
        ],
      },
    ];
  }
  const errors = validateHelper.validation(data, templateValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};

module.exports = popupValidation;
