const isEmpty = require('../validation/isEmpty');
const Validator = require('validator');
const PhoneNumber = require('awesome-phonenumber');

const validationHelper = {};

validationHelper.validation = (data, validationArray) => {
  let errors = {};
  validationArray.forEach((validationObj) => {
    let value = data[validationObj.field];
    value = !isEmpty(value) ? value + '' : '';
    const validation = validationObj.validate;

    for (let i = 0; i < validation.length; i++) {
      const val = validation[i];
      switch (val.condition) {
        case 'IsEmpty':
          if (Validator.isEmpty(value)) {
            errors[validationObj.field] = val.msg;
          }
          break;
        case 'IsLength':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isLength(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsInt':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isInt(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsNumeric':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isNumeric(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsEqual':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.equals(val.option.one, val.option.two)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsMongoId':
          if (!Validator.isEmpty(value)) {
            if (!Validator.isMongoId(value)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsIn':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isIn(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsDate':
          if (!Validator.isEmpty(value)) {
            if (!Validator.isISO8601(value)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsEmail':
          if (!Validator.isEmpty(value)) {
            if (!Validator.isEmail(value)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsBoolean':
          if (!Validator.isEmpty(value)) {
            if (!Validator.isBoolean(value.toString())) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsAfter':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isAfter(value, val.option.date)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsBefore':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.IsBefore(value, val.option.date)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsJSON':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isJSON(value)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsJWT':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.IsJWT(value)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsURL':
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isURL(value, val.option.protocols)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case 'IsUppercase':
          if (!Validator.isEmpty(value)) {
            if (!Validator.isUppercase(value)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;

        case 'IsProperKey':
          if (!Validator.isEmpty(value)) {
            var arr = ['`', '!', '@', ',', '#', '$', '%', '^', '&', '*', '(', ')', '+', '?', '/', '|', '.', '\\'];
            arr.forEach((element) => {
              let temp = value.includes(element);
              if (temp) {
                errors[validationObj.field] = `this field cannot contain special character  ::  ${element}`;
              }
            });
          }
          break;
        case 'IsPhone':
          if (!Validator.isEmpty(value)) {
            let pn = new PhoneNumber(value);
            if (pn.isValid()) {
              if (val.option) {
                if (val.option.isMobile) {
                  if (!pn.isMobile()) {
                    errors[validationObj.field] = 'Enter mobile number';
                  }
                } else {
                  if (!pn.isFixedLine()) {
                    errors[validationObj.field] = 'Enter landline number';
                  }
                }
              }
            } else {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        default:
          break;
      }
      if (errors[validationObj.field]) {
        i = validation.length;
      }
    }
  });
  return errors;
};

module.exports = validationHelper;
