const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const config = require('./userConfig');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const validations = {};

validations.sanitizeRegister = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeUpdateProfile = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'date_of_birth',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'bio',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'skills',
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
    {
      field: 'roles',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeLogin = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeUserScan = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

validations.sanitizeAdd = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeUpdateUserProfile = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'bio',
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
    {
      field: 'phone',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'location',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validations.validateUpdateUserProfile = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.nameLength,
          option: { min: 2, max: 30 },
        },
      ],
    },
    {
      field: 'phone',
      validate: [
        {
          condition: 'IsPhoneNumber',
          msg: config.validate.invalid,
        },
      ],
    },
    {
      field: 'date_of_birth',
      validate: [
        {
          condition: 'IsDate',
          msg: config.validate.invalid,
        },
      ],
    },
  ];

  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};
validations.validateLoginInput = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
    {
      field: 'password',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};
validations.validateUpdateProfile = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.nameLength,
          option: { min: 2, max: 30 },
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
    {
      field: 'date_of_birth',
      validate: [
        {
          condition: 'IsDate',
          msg: config.validate.isDate,
        },
      ],
    },
    {
      field: 'email_verified',
      validate: [
        {
          condition: 'IsBoolean',
          msg: config.validate.invalidInput,
        },
      ],
    },
    {
      field: 'roles',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsMongoId',
          msg: config.validate.invalid,
        },
      ],
    },
    {
      field: 'phone',
      validate: [
        {
          condition: 'IsPhoneNumber',
          msg: config.validate.invalid,
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};

validations.validateRegisterInput = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.nameLength,
          option: { min: 2, max: 30 },
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
    {
      field: 'password',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};
validations.validateUserScanInput = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};

validations.validateAdd = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.nameLength,
          option: { min: 2, max: 100 },
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
    {
      field: 'roles',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
      ],
    },
    {
      field: 'password',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.pwLength,
          option: { min: 6, max: 100 },
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};
validations.validateEdit = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.nameLength,
          option: { min: 2, max: 100 },
        },
      ],
    },
    {
      field: 'roles',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};
validations.validateSubscribe = (req, res, next) => {
  const data = req.body;
  const SubscriberId = req.user.id;
  if (SubscriberId) {
    if (data.UserId && !isEmpty(data.UserId)) {
      const validateArray = [
        {
          field: 'UserId',
          validate: [
            {
              condition: 'IsMongoId',
              msg: config.validate.isMongoId,
            },
          ],
        },
      ];
      const errors = validateHelper.validation(data, validateArray);
      if (!isEmpty(errors)) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, errors, config.validate.invalidInput, null);
      } else {
        next();
      }
    } else if (data.CompanyId && !isEmpty(data.CompanyId)) {
      const validateArray = [
        {
          field: 'CompanyId',
          validate: [
            {
              condition: 'IsMongoId',
              msg: config.validate.isMongoId,
            },
          ],
        },
      ];
      const errors = validateHelper.validation(data, validateArray);
      if (!isEmpty(errors)) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, errors, config.validate.invalidInput, null);
      } else {
        next();
      }
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, config.validationMessage.userOrCompanyRequired, config.subscribeFail, null);
    }
  }
};
validations.validateLogsLogoutAction = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'loginID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsMongoId',
          msg: config.validate.invalidInput,
        },
      ],
    },
  ];

  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};
validations.validateChangePassword = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'newPassword',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
      ],
    },
    {
      field: 'newPassword2',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
        {
          condition: 'IsEqual',
          msg: config.validate.isEqual,
          option: { one: data.newPassword, two: data.newPassword2 },
        },
      ],
    },
    {
      field: 'oldPassword',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};
module.exports = validations;
