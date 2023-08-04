const fileUploadHelper = filePath => {
  const multer = require('multer');
  const path = require('path');
  const mkdirp = require('mkdirp');
  const hasher = require('./others.helper');

  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const uploadPath = path.resolve(filePath);
      try {
        const folderStat = await ensureFolderExists(uploadPath, 484);
        if (folderStat) {
          cb(null, uploadPath);
        } else {
          cb(null, '');
        }
      } catch (err) {
        cb(err);
      }
    },
    filename: async (req, file, cb) => {
      const randomString = await hasher.generateRandomHexString(15);
      cb(null, randomString + '-' + file.originalname);
    },
    onFileUploadStart: file => {
      recentFile = file;
      recentFile.finished = false;
    },
    onFileUploadComplete: file => {
      recentFile.finished = true;
    },
  });
  const ensureFolderExists = (path, mask) => {
    return new Promise((resolve, reject) => {
      mkdirp(path, err => {
        if (err) {
          reject(err); // something else went wrong
        } else {
          resolve(true); // successfully created folder
        }
      });
    });
  };
  return {
    uploader: multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes('jpeg') && !file.mimetype.includes('jpg') && !file.mimetype.includes('png') && !file.mimetype.includes('gif') && !file.mimetype.includes('pdf')) {
          return cb(null, false, new Error('Only images are allowed'));
        }
        cb(null, true);
      },
    }),
  };
};

module.exports = fileUploadHelper;
