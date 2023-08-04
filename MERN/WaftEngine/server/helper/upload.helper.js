// const { fileSizes } = require('../config/keys');
require('dotenv').config();
const httpStatus = require('http-status');
const otherHelper = require('./others.helper');
const multer = require('multer');
const maxFileSize = process.env.maxFileSize || 1000000000;
const uploaderHelper = {};

let mimeType = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/svg': 'svg',
  'image/svg+xml': 'svg+xml',
  'image/gif': 'gif',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg',
};
uploaderHelper.uploadFiles = (destinationPath, uploadTYpe, fieldData) => {
  const temp = maxFileSize / (1024 * 1024);
  var storage = multer.diskStorage({
    destination: destinationPath,
    filename: async (req, file, cb) => {
      const randomString = await otherHelper.generateRandomHexString(15);
      cb(null, randomString + '-' + file.originalname);
    },
  });
  const uploader = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      const isValid = !!mimeType[file.mimetype]; //check if the valid mime type is submitted
      let error = isValid ? null : new Error('Only images and video files  allowed!');
      callback(error, isValid);
    },
    limits: { fileSize: maxFileSize },
  });

  if (uploadTYpe === 'array') {
    var upload = uploader.array(fieldData[0], fieldData[1]);
  } else if (uploadTYpe === 'fields') {
    var upload = uploader.fields(fieldData);
  } else if (uploadTYpe === 'single') {
    var upload = uploader.single(fieldData);
  } else if (uploadTYpe === 'any') {
    var upload = uploader.any(fieldData);
  }

  return (fileUpload = (req, res, next) => {
    upload(req, res, function (error) {
      if (error) {
        //instanceof multer.MulterError
        if (error.code == 'LIMIT_FILE_SIZE') {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, error, null, `FileSize must be greater than ${temp}MB`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, error, null, `${error}`, null);
        }
      } else {
        next();
      }
    });
  });
};

module.exports = uploaderHelper;
