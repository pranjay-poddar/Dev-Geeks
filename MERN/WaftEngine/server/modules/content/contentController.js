const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const contentSch = require('./contentSchema');
const contentConfig = require('./contentConfig');
const contentController = {};

contentController.GetContent = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);

    if (req.query.find_name) {
      searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_key) {
      searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_from) {
      searchQuery = { publish_from: { $regex: req.query.find_publish_from, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_to) {
      searchQuery = { publish_to: { $regex: req.query.find_publish_to, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_is_page) {
      searchQuery = { ...searchQuery, is_page: req.query.find_is_page };
    }
    populate = [{ path: 'image' }];
    let pulledData = await otherHelper.getQuerySendResponse(contentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, contentConfig.gets, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};
contentController.SaveContent = async (req, res, next) => {
  try {
    const contents = req.body;
    if (contents && contents._id) {
      const update = await contentSch.findByIdAndUpdate(contents._id, { $set: contents }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, contentConfig.save, null);
    } else {
      contents.added_by = req.user.id;
      const newContent = new contentSch(contents);
      const contentsSave = await newContent.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, contentsSave, null, contentConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
contentController.GetContentDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contents = await contentSch.findOne({ _id: id, is_deleted: false }).populate([{ path: 'image' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, contents, null, contentConfig.get, null);
  } catch (err) {
    next(err);
  }
};
contentController.GetContentForCounter = async (req, res, next) => {
  try {
    var doc = 0;
    counterSch.findByIdAndUpdate({ _id: 'visitor_counter' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counterSch) {
      if (error) return next(error);
      doc = (counterSch && counterSch.seq) || 1;
      const contents = { description: '<div>Visitor : <span class="visitor_counter">' + doc + '</span></div>', key: 'counter', name: 'counter' };
      return otherHelper.sendResponse(res, httpStatus.OK, true, contents, null, contentConfig.get, null);
    });
  } catch (err) {
    next(err);
  }
};
contentController.GetContentByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    const contents = await contentSch.findOne({ key, is_deleted: false, is_active: true }).populate([{ path: 'image' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, contents ? contents : { key: req.params.key, description: `<div class="text-sm border border-red-100 bg-red-50 rounded px-2 py-1 text-red-600 inline-block m-4">Content not found [key=${req.params.key}]</div>` }, null, contentConfig.get, null);
  } catch (err) {
    next(err);
  }
};
contentController.DeleteContent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await contentSch.findByIdAndUpdate(id, { $set: { is_deleted: true } }, { new: true });
    if (del && del._id) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'content delete success!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, 'cannot delete', 'cannot delete', null);
    }
  } catch (err) {
    next(err);
  }
};

contentController.selectMultipleData = async (req, res, next) => {
  const { content_id, type } = req.body;

  if (type == 'is_active') {
    const Data = await contentSch.updateMany(
      { _id: { $in: content_id } },
      [{
        $set: {
          is_active: { $not: "$is_active" }
        },
      }],
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  }
  else {
    const Data = await contentSch.updateMany(
      { _id: { $in: content_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  };
};
module.exports = contentController;
