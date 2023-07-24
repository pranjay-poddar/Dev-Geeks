const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const folderSch = require('./folderSchema');
const validations = {};

validations.sanitize = (req, res, next) => {
      sanitizeHelper.sanitize(req, [
            {
                  field: 'name',
                  sanitize: {
                        trim: true,
                  },
            }
      ]);
      next();
};
validations.validate = async (req, res, next) => {
      const data = req.body;
      const validateArray = [
            {
                  field: 'name',
                  validate: [
                        {
                              condition: 'IsEmpty',
                              msg: 'this field is required',
                        },
                        {
                              condition: 'IsProperKey',
                              msg: 'not Valid Input',
                        },
                  ],
            }
      ]

      let errors = validateHelper.validation(data, validateArray);

      let name_filter = { is_deleted: false, name: data.name }
      if (data._id) {
            name_filter = { ...name_filter, _id: { $ne: data._id } }
      }
      const already_name = await folderSch.findOne(name_filter);
      if (already_name && already_name._id) {
            errors = { ...errors, name: 'folder_name already exist' }
      }
      if (!isEmpty(errors)) {
            return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'Input Errors', null);
      } else {
            next();
      }
};

validations.validateRootFolder = async (req, res, next) => {
      const folderId = req.params.folder_id;
      const temp = await folderSch.findById({ _id: folderId })
      let errors
      if (temp && temp.is_root) {
            errors = { invalid_upload: 'You cannot upload files in root folder. Please create sub folder and upload images.' }
      }
      if (!isEmpty(errors)) {
            return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'Invalid Actions', null);
      } else {
            next();
      }
};
module.exports = validations;
