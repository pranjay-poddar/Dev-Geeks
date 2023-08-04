const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const fileSch = require('./fileSchema');
const folderSch = require('./folderSchema');
const userSch = require('../user/userSchema');
const { getSetting } = require('../../helper/settings.helper');
const fileController = {};

fileController.GetFileAndFolder = async (req, res, next) => {
  try {
    const search = req.query.search;
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10, false);

    let term;
    // if (search) {
    term = { $regex: search || '', $options: 'i' };

    let id = '';
    if (req.params.id == 'undefined' || req.params.id === 'root') {
      const root = await folderSch.findOne({ is_root: true, added_by: req.user.id, is_deleted: false });
      if (root) {
        id = root._id;
      } else {
        const rootFolder = new folderSch({ name: 'Root', is_root: true, path: [], added_by: req.user.id });
        let root = await rootFolder.save();
        id = root._id;
      }
    } else {
      id = req.params.id;
    }
    let selfFilter = { is_deleted: false, _id: id };
    let fileFilter = { is_deleted: false, folder_id: id, renamed_name: term };
    let folderFilter = { is_deleted: false, parent_folder: id, name: term };

    const self = await folderSch
      .findOne(selfFilter)
      .populate([{ path: 'path', select: { name: 1 } }])
      .select({ name: 1, path: 1, _id: 1 });
    sortQuery = { added_at: 1 };

    let folders = await otherHelper.getQuerySendResponse(folderSch, page, size, sortQuery, folderFilter, selectQuery, next, populate);
    let totalFolderCount = await folderSch.countDocuments(folderFilter);
    let totalFilesCount = await fileSch.countDocuments(fileFilter);
    total = totalFolderCount + totalFilesCount;

    let tempRatio = totalFolderCount / size;
    if (tempRatio > page) {
      var skipFiles = 0;
      var limitFiles = size - folders.data.length;
    } else {
      if (folders.data.length == 0) {
        skipFiles = (page - 1) * size - totalFolderCount;
        limitFiles = size;
      } else {
        skipFiles = 0;
        limitFiles = size - folders.data.length;
      }
    }
    let files = {};
    if (limitFiles != 0) {
      files.data = await fileSch.find(fileFilter).select(selectQuery).sort(sortQuery).skip(skipFiles).limit(limitFiles);
    } else {
      files.data = [];
    }

    return otherHelper.paginationSendResponse(
      res,
      httpStatus.OK,
      true,
      {
        folders: { data: folders.data, totalData: folders.data.length },
        files: { data: files.data, totalData: files.data.length },
        self: self,
      },
      'files and folders get success!',
      page,
      size,
      total,
      sortQuery,
    );
  } catch (err) {
    next(err);
  }
};

fileController.AddFolders = async (req, res, next) => {
  try {
    const data = req.body;
    const parent_id = req.params.id;
    const folder = await folderSch.findById(parent_id).select({ path: 1 });
    if (data._id) {
      data.path = [...folder.path, folder._id];
      data.parent_folder = folder._id;
      const update = await folderSch.findByIdAndUpdate(data._id, { $set: data }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'folder edited', null);
    } else {
      added_by = req.user.id;
      data.path = [...folder.path, folder._id];
      data.parent_folder = folder._id;
      data.added_by = added_by;
      const newFolder = new folderSch(data);
      await newFolder.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newFolder, null, 'new folder created', null);
    }
  } catch (err) {
    next(err);
  }
};
fileController.RenameFolder = async (req, res, next) => {
  try {
    const { renamed_name, _id } = req.body;
    const file = await fileSch.findByIdAndUpdate(_id, { $set: { renamed_name } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, file, null, 'File Renamed', null);
  } catch (err) {
    next(err);
  }
};
fileController.UploadFiles = async (req, res, next) => {
  try {
    let files = [];
    for (let i = 0; i < req.files.length; i++) {
      let file = req.files[i];
      file.added_by = req.user.id;
      file.renamed_name = file.originalname;

      file.folder_id = req.params.folder_id;
      const newFile = new fileSch(file);
      const fileSave = await newFile.save();
      files.push(fileSave);
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, files, null, 'File Saved Success !', null);
  } catch (err) {
    next(err);
  }
};
fileController.UploadFilesToRoot = async (req, res, next) => {
  try {
    let id = '';
    const root = await folderSch.findOne({ is_root: true });
    if (root && root._id) id = root._id;
    else {
      const rootFolder = new folderSch({ name: 'Root', is_root: true, path: [], added_by: req.user.id });
      const root = await rootFolder.save();
      id = root._id;
    }
    let files = [];
    for (let i = 0; i < req.files.length; i++) {
      let file = req.files[i];
      file.added_by = req.user.id;
      file.renamed_name = file.originalname;
      if (id) file.folder_id = id;
      const newFile = new fileSch(file);
      const fileSave = await newFile.save();
      files.push(fileSave);
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, files, null, 'File Saved Success !', null);
  } catch (err) {
    next(err);
  }
};
fileController.DeleteFolder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await folderSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date(), deleted_by: req.user.id } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'folder delete success!', null);
  } catch (err) {
    next(err);
  }
};

fileController.DeleteFile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await fileSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date(), deleted_by: req.user.id } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'file delete success!', null);
  } catch (err) {
    next(err);
  }
};
module.exports = fileController;
