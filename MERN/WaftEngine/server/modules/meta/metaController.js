const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const metaConfig = require('./metaConfig');
const metaSch = require('./metaSchema');
const metaController = {};

metaController.getAllMeta = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i x',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_client_route) {
      searchQuery = {
        client_route: {
          $regex: req.query.find_client_route,
          $options: 'i x',
        },
        ...searchQuery,
      };
    }
    let pulledData = await otherHelper.getQuerySendResponse(metaSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, metaConfig.get, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

metaController.getDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const metaDetail = await metaSch.findOne({ _id: id, is_deleted: false }, 'client_route title meta_keywords meta_description meta_image added_by added_at updated_by updated_at');
    return otherHelper.sendResponse(res, httpStatus.OK, true, metaDetail, null, metaConfig.get, null);
  } catch (err) {
    next(err);
  }
};

metaController.getByRoute = async (req, res, next) => {
  try {
    const route = req.params[0];
    const metaDetail = await metaSch.findOne({ client_route: route, is_deleted: false }, 'title meta_keywords meta_description meta_image');
    return otherHelper.sendResponse(res, httpStatus.OK, true, metaDetail, null, metaConfig.get, null);
  } catch (err) {
    next(err);
  }
};

metaController.saveMeta = async (req, res, next) => {
  try {
    let { _id, client_route, title, meta_keywords, meta_description } = req.body;
    let metaS = { client_route, title, meta_keywords, meta_description };

    if (req.file) {
      metaS.meta_image = req.file;
    }
    if (_id) {
      metaS.updated_by = req.user.id;
      metaS.updated_at = Date.now();
      const update = await metaSch.findOneAndUpdate(_id, { $set: metaS }, { new: true });
      if (!update) {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, metaConfig.notFound, null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, metaConfig.update, null);
      }
    } else {
      metaS.added_by = req.user.id;
      const newMeta = new metaSch(metaS);
      const metaSaved = await newMeta.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, metaSaved, null, metaConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};

metaController.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await metaSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: Date.now(), deleted_by: req.user.id } });
    if (del) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, metaConfig.delete, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, metaConfig.notFound, null);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = metaController;
