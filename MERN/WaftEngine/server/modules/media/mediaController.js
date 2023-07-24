const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const folderSch = require('../files/folderSchema');
const fileSch = require('../files/fileSchema');

const mediaSch = require('./mediaSchema');
const mediaController = {};

mediaController.GetMediaPagination = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = [{ path: 'added_by' }];
    selectQuery = 'field_name type destination path field_name original_name mimetype size encoding added_at module';
    let media = await otherHelper.getQuerySendResponse(mediaSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, media.data, 'media get success!', page, size, media.totalData);
  } catch (err) {
    next(err);
  }
};
mediaController.GetMedia = async (req, res, next) => {
  const page = parseInt(req.params.page);
  const medias = await mediaSch
    .find({ is_deleted: false })
    .limit(12)
    .skip(12 * page)
    .sort({ _id: -1 })
    .select('_id path field_name original_name mimetype size encoding');
  return otherHelper.sendResponse(res, httpStatus.OK, true, medias, null, 'Media Get Success !', null);
};
mediaController.SaveMedia = async (req, res, next) => {
  try {
    let media = req.body;
    if (media._id) {
      if (req.file && req.file) {
        media = req.file;
      }
      const update = await mediaSch.findByIdAndUpdate(media._id, { $set: media }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Media Saved Success !', null);
    } else {
      media = req.file;
      media.added_by = req.user.id;
      media.destination =
        media.destination
          .split('\\')
          .join('/')
          .split('server/')[1] + '/';
      media.path = media.path
        .split('\\')
        .join('/')
        .split('server/')[1];
      media.type = req.params.type;
      media.added_by = req.user.id;
      const newMedia = new mediaSch(media);
      const mediaSave = await newMedia.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, mediaSave, null, 'Media Saved Success !', null);
    }
  } catch (err) {
    next(err);
  }
};
mediaController.SaveMultipleMedia = async (req, res, next) => {
  try {
    let medias = [];
    for (let i = 0; i < req.files.length; i++) {
      let media = req.files[i];
      media.added_by = req.user.id;
      media.destination =
        media.destination
          .split('\\')
          .join('/')
          .split('server/')[1] + '/';
      media.path = media.path
        .split('\\')
        .join('/')
        .split('server/')[1];
      media.type = req.params.type;
      const newMedia = new mediaSch(media);
      const mediaSave = await newMedia.save();
      medias.push(mediaSave);
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, medias, null, 'Media Saved Success !', null);
  } catch (err) {
    next(err);
  }
};
mediaController.GetMediaDetail = async (req, res, next) => {
  const id = req.params.id;
  const media = await mediaSch.findOne({ _id: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, media, null, 'Media Get Success !', null);
};
mediaController.DeleteMedia = async (req, res, next) => {
  const id = req.params.id;
  const media = await mediaSch.findByIdAndUpdate(
    id,
    {
      $set: { is_deleted: true, deleted_by: req.user.id, deleted_at: new Date() },
    },
    { new: true },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, media, null, 'Media Delete Success !', null);
};

mediaController.DeleteAllMedia = async (req, res, next) => {
  let folder_id = req.body.folder_id;
  let file_id = req.body.file_id;

  let file, folder;

  for (let i = 0; i < folder_id.length; i++) {
    folder = await folderSch.findByIdAndUpdate(
      folder_id[i],
      {
        $set: { is_deleted: true, deleted_by: req.user.id, deleted_at: new Date() },
      },
      { new: true },
    );
  }
  for (let i = 0; i < file_id.length; i++) {
    file = await fileSch.findByIdAndUpdate(
      file_id[i],
      {
        $set: { is_deleted: true, deleted_by: req.user.id, deleted_at: new Date() },
      },
      { new: true },
    );
  }

  return otherHelper.sendResponse(res, httpStatus.OK, true, { file, folder }, null, 'Media Delete Success !', null);
};
mediaController.UploadFromCkEditor = async (req, res, next) => {
  try {
    let html = '';
    html += `<script type='text/javascript'>
    var funcNum = ${req.query.CKEditorFuncNum};
    var url = "${keyConfig.server_url}/public/media/${req.files[0].filename}";
    var message = "Uploaded file successfully";
   window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);
    </script>`;

    res.send(html);
  } catch (err) {
    next(err);
  }
};
module.exports = mediaController;
