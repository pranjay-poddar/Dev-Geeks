const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const contactConfig = require('./contactConfig');
const contactSch = require('./contactSchema');
const renderMail = require('./../template/templateController').internal;
const emailHelper = require('./../../helper/email.helper');
const { getSetting } = require('./../../helper/settings.helper');
const contactController = {};

contactController.PostContact = async (req, res, next) => {
  try {
    let { name, email, message, subject } = req.body;
    const newUser = new contactSch({ name, email, message, subject });
    const user = await newUser.save();
    let contact_to_admin = await getSetting('template', 'email', 'contact_to_admin');
    let contact_to_user = await getSetting('template', 'email', 'contact_to_user');
    let admin_emails = await getSetting('user', 'admin_email', 'email_array');

    if (user) {
      const data = {
        name: user.name,
        email: user.email,
        msg: user.message,
        sub: user.subject,
      };
      if (admin_emails.length != -1) {
        for (i = 0; i < admin_emails.length; i++) {
          let renderedMail = await renderMail.renderTemplate(contact_to_admin, data, admin_emails[i]);
          if (renderMail.error) {
            console.log('render mail error: ', renderMail.error);
          } else {
            emailHelper.send(renderedMail, next);
          }
        }
      }
      const renderedMailForAdmin = await renderMail.renderTemplate(contact_to_user, data, user.email);
      if (renderMail.error) {
        console.log('render mail error: ', renderMail.error);
      } else {
        emailHelper.send(renderedMailForAdmin, next);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, user, null, contactConfig.save, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, contactConfig.err, null, null);
    }
  } catch (err) {
    next(err);
  }
};
contactController.GetContact = async (req, res, next) => {
  let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
  if (req.query.find_name) {
    searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_subject) {
    searchQuery = { subject: { $regex: req.query.find_subject, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_added_at) {
    searchQuery = { added_at: { $regex: req.query.find_added_at, $options: 'i' }, ...searchQuery };
  }
  selectQuery = 'name email message subject added_at is_deleted';
  let contacts = await otherHelper.getQuerySendResponse(contactSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, contacts.data, contactConfig.gets, page, size, contacts.totalData);
};

contactController.GetContactById = async (req, res, next) => {
  const id = req.params.id;
  let contact = await contactSch.findOne({ _id: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, contact, null, contactConfig.get, null);
};

contactController.DeleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delContact = await contactSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date() } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, delContact, null, 'contact delete success!', null);
  } catch (err) {
    next(err);
  }
};

contactController.selectMultipleData = async (req, res, next) => {
  try {
    const { contact_id } = req.body;
    const Data = await contactSch.updateMany(
      { _id: { $in: contact_id } },
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

module.exports = contactController;
