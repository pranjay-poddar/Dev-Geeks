const httpStatus = require('http-status');
const templateSch = require('./templateSchema');
const otherHelper = require('../../helper/others.helper');
const templateConfig = require('./templateConfig');
const isEmpty = require('../../validation/isEmpty');
const { getSetting } = require('../../helper/settings.helper');
const templateController = {};
const internal = {};

templateController.getTemplateName = async (req, res, next) => {
  try {
    const names = await templateSch.find({ is_deleted: false }).select('template_name template_key');
    return otherHelper.sendResponse(res, httpStatus.OK, true, names, null, templateConfig.namesGet, null);
  } catch (err) {
    next(err);
  }
};

templateController.getTemplateDetail = async (req, res, next) => {
  try {
    const _id = req.params.key;
    const template = await templateSch.findOne({ _id, is_deleted: false }, 'template_name template_key information variables from subject body alternate_text updated_by updated_at');

    if (template) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, template, null, templateConfig.templateGet, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, templateConfig.templateNotFound, null);
    }
  } catch (err) {
    next(err);
  }
};

templateController.postTemplate = async (req, res, next) => {
  try {
    const template = req.body;
    template.updated_by = req.user.id;
    template.updated_at = Date.now();
    if (template && template._id) {
      const update = await templateSch.findByIdAndUpdate({ _id: template._id }, { $set: template }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, templateConfig.templateSave, null);
    } else {
      let newTemplate = new templateSch(template);
      let saved = await newTemplate.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, saved, null, templateConfig.templateSave, null);
    }
  } catch (err) {
    next(err);
  }
};

internal.renderTemplate = async (template_key, variables_OBJ, toEmail) => {
  if (isEmpty(template_key) || isEmpty(variables_OBJ) || isEmpty(toEmail)) {
    return { error: 'Empty Data' };
  }
  const unrendered = await templateSch.findOne({ template_key });
  if (isEmpty(unrendered)) {
    return { error: 'Invalid Template Key' };
  }
  let from = unrendered.from + '';
  let body = unrendered.body + '';
  let subject = unrendered.subject + '';
  let alternate_text = unrendered.alternate_text + '';
  const client_url = await getSetting('global', 'url', 'client');
  const server_url = await getSetting('global', 'url', 'server');
  const application_name = await getSetting('global', 'application', 'application_name');
  variables_OBJ.client_url = client_url;
  variables_OBJ.server_url = server_url;
  variables_OBJ.application_name = application_name;
  let variables_keys = Object.keys(variables_OBJ);

  for (let i = 0; i < variables_keys.length; i++) {
    let re = new RegExp(`%${variables_keys[i]}%`, 'g');
    subject = subject.replace(re, variables_OBJ[variables_keys[i]]);
    body = body.replace(re, variables_OBJ[variables_keys[i]]);
    alternate_text = alternate_text.replace(re, variables_OBJ[variables_keys[i]]);
  }
  const email_footer = await getSetting('email', 'header_footer', 'footer');
  const email_header = await getSetting('email', 'header_footer', 'header');

  body = `${email_header}${body}${email_footer}`;
  return { from, subject, html: body, text: alternate_text, to: toEmail };
};

module.exports = { templateController, internal };
