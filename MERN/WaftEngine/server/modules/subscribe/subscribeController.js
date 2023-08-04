const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const subscribeSch = require('./subscribeSchema');
const mailHelper = require('../../helper/email.helper');
const { getSetting } = require('./../../helper/settings.helper');
const renderMail = require('../template/templateController').internal;
const subscribeController = {};

subscribeController.GetSubscribe = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    searchQuery = {
      is_subscribed: true,
      ...searchQuery,
    };
    if (req.query.find_email) {
      searchQuery = {
        email: {
          $regex: req.query.find_email,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let subscriber = await otherHelper.getQuerySendResponse(subscribeSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, subscriber.data, 'subscriber get successful!', page, size, subscriber.totalData);
  } catch (err) {
    next(err);
  }
};
subscribeController.SaveSubscribe = async (req, res, next) => {
  try {
    let subscriber = req.body;
    const user_subscribe = await getSetting('template', 'email', 'user_subscribe');

    const subscribeMail = await renderMail.renderTemplate(user_subscribe,
      {
        email: subscriber.email
      },
      subscriber.email);
    if (subscribeMail.error) {
      console.log('render mail error: ', subscribeMail.error);
    } else {
      mailHelper.send(subscribeMail, next);
    }
    subscriber.is_subscribed = true;
    const newSubscribe = new subscribeSch(subscriber);
    const subscriberSave = await newSubscribe.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, subscriberSave, null, 'subscriber saved successful!', null);
  } catch (err) {
    next(err);
  }
};
subscribeController.GetSubscribeById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const subscriber = await subscribeSch.findOne({ _id: id, is_subscribed: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, subscriber, null, 'subscriber detail get successful!', null);
  } catch (err) {
    next(err);
  }
};
subscribeController.DeleteSubscribe = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delSubscriber = await subscribeSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date() } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, delSubscriber, null, 'subscriber delete successful!', null);
  } catch (err) {
    next(err);
  }
};

subscribeController.selectMultipleData = async (req, res, next) => {
  try {
    const { subscriber_id } = req.body;
    const Data = await subscribeSch.updateMany(
      { _id: { $in: subscriber_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  } catch (err) {
    next(err);
  }
};
module.exports = subscribeController;
