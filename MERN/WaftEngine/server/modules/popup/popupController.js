const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const popupSch = require('./popupSchema');
const popupConfig = require('./popupConfig');
const popupController = {};
const internal = {};

popupController.getPopup = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_title) {
      searchQuery = { title: { $regex: req.query.find_title, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_key) {
      searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_start_date) {
      searchQuery = { start_date: { $regex: req.query.find_start_date, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_end_date) {
      searchQuery = { end_date: { $regex: req.query.find_end_date, $options: 'i' }, ...searchQuery };
    }
    // if (req.query.find_is_page) {
    //   searchQuery = { ...searchQuery, is_page: req.query.find_is_page };
    // }
    let data = await otherHelper.getQuerySendResponse(popupSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, popupConfig.gets, page, size, data.totalData, sortQuery);
  } catch (err) {
    next(err);
  }
};
popupController.SavePopup = async (req, res, next) => {
  try {
    const popup = req.body;

    if (popup._id) {
      const update = await popupSch.findByIdAndUpdate(popup._id, { $set: popup }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, popupConfig.save, null);
    } else {
      popup.added_by = req.user.id;
      const newPopup = new popupSch(popup);
      const popupSave = await newPopup.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, popupSave, null, popupConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
popupController.getPopupDetail = async (req, res, next) => {
  try {
    const id = await otherHelper.returnIdIfSlug(req.params.id, 'key', popupSch);
    let selectq = '';
    let populateq = [{ path: "added_by", select: 'name' }, { path: "templateRequirement.image", select: 'filename size path mimetype ' }];
    const popup = await popupSch.findOne({ _id: id, is_deleted: false }).select(selectq).populate(populateq);
    return otherHelper.sendResponse(res, httpStatus.OK, true, popup, null, popupConfig.get, null);
  } catch (err) {
    next(err);
  }
};
popupController.getPopupByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    let selectq = { added_by: 0, added_at: 0, };
    const popup = await popupSch.findOne({ key, is_deleted: false }, selectq);
    return otherHelper.sendResponse(res, httpStatus.OK, true, popup, null, popupConfig.get, null);
  } catch (err) {
    next(err);
  }
};
popupController.DeletePopup = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await popupSch.findOneAndUpdate({ _id: id, is_removal: true }, { $set: { is_deleted: true } }, { new: true });
    if (del && del._id) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'popup delete success!', null);

    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, 'cannot delete', 'cannot delete', null);

    }
  } catch (err) {
    next(err);
  }
};

module.exports = popupController;
