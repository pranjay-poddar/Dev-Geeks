'use strict';
const crypto = require('crypto');
const PhoneNumber = require('awesome-phonenumber');
const Validator = require('validator');

const otherHelper = {};

otherHelper.mongoIdExistInArray = (mongodbIdArray, mongoDbId) => {
  for (let i = 0; i < mongodbIdArray.length; i++) {
    if (mongodbIdArray[i].toString() === mongoDbId.toString()) return true;
  }
  return false;
};

otherHelper.generateRandomHexString = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};
otherHelper.generateRandomNumberString = (len) => {
  return Math.floor(Math.random() * 8999 + 1000);
};
otherHelper.mongoIdExistInArray = (mongodbIdArray, mongoDbId) => {
  if (mongodbIdArray) {
  } else {
    mongodbIdArray = [];
  }
  for (let i = 0; i < mongodbIdArray.length; i++) {
    if (mongodbIdArray[i].toString() === mongoDbId.toString()) return true;
  }
  return false;
};
otherHelper.parsePhoneNo = (phone, RegionCode) => {
  try {
    var pn = new PhoneNumber(phone, RegionCode);
    if (!pn.isValid()) {
      return {
        status: false,
        data: 'Provided no is invalid mobile no.',
      };
    } else if (!pn.isMobile()) {
      return {
        status: false,
        data: 'Provided no should be mobile no.',
      };
    } else if (pn.isValid()) {
      return {
        status: true,
        data: pn.getNumber('e164'),
      };
    } else {
      return {
        status: true,
        data: pn.getNumber('e164'),
      };
    }
  } catch (err) {
    return err;
  }
};

otherHelper.parseFilters = (req, defaults, is_deleted) => {
  const size_default = defaults ? defaults : 10;
  let page;
  let size;
  let sortQuery = { _id: -1 };
  let sort_key;
  let searchQuery = {};
  let populate = [];
  let selectQuery = { __v: 0 };
  if (is_deleted === undefined) {
  } else if (is_deleted === null) {
  } else {
    if (!isNaN(is_deleted)) {
      searchQuery = { ...searchQuery, is_deleted: is_deleted };
      selectQuery = { ...selectQuery, is_deleted: 0, deleted_at: 0, deleted_by: 0 };
    }
  }
  if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
    page = Math.abs(req.query.page);
  } else {
    page = 1;
  }
  if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
    size = Math.abs(req.query.size);
  } else {
    size = size_default;
  }
  if (req.query.sort) {
    let sortField = req.query.sort.slice(1);
    let sortBy = req.query.sort.charAt(0);
    if (sortBy == 1 && !isNaN(sortBy) && sortField) {
      //one is ascending
      sortQuery = sortField;
    } else if (sortBy == 0 && !isNaN(sortBy) && sortField) {
      //zero is descending
      sortQuery = '-' + sortField;
    } else {
      sortQuery = '';
    }
  }
  return { page, size, sortQuery, searchQuery, selectQuery, populate };
};

otherHelper.sendResponse = (res, status, success, data, errors, msg, token) => {
  const response = {};
  if (success !== null) response.success = success;
  if (data !== null) response.data = data;
  if (errors !== null) response.errors = errors;
  if (msg !== null) response.msg = msg;
  if (token !== null) response.token = token;
  return res.status(status).json(response);
};
otherHelper.paginationSendResponse = (res, status, success, data, msg, pageNo, pagesize, totalData) => {
  const response = {};
  if (data) response.data = data;
  if (success !== null) response.success = success;
  if (msg) response.msg = msg;
  if (pageNo) response.page = pageNo;
  if (pagesize) response.size = pagesize;
  if (typeof totalData === 'number') response.totalData = totalData;
  return res.status(status).json(response);
};
otherHelper.getQuerySendResponse = async (model, page, size, sortQuery, searchQuery, selectQuery, next, populate) => {
  let pulledData = {};
  try {
    pulledData.data = await model
      .find(searchQuery)
      .select(selectQuery)
      .sort(sortQuery)
      .skip((page - 1) * size)
      .limit(size * 1)
      .populate(populate);
    pulledData.totalData = await model.countDocuments(searchQuery);
    return pulledData;
  } catch (err) {
    next(err);
  }
};
otherHelper.returnIdIfSlug = async (slug_url, slug_key, schema) => {
  if (Validator.isMongoId(slug_url)) {
    return slug_url;
  } else {
    const filter = { [slug_key]: slug_url.toLowerCase(), is_deleted: false };
    const d = await schema.findOne(filter).select({ _id: 1 });
    if (d) {
      return d._id;
    } else {
      return null;
    }
  }
};
otherHelper.slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};
otherHelper.regexp = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\/^$|#]/g, ''); // Remove all non-word chars
};
module.exports = otherHelper;
