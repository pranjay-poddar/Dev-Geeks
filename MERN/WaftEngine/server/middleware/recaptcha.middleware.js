const httpStatus = require('http-status');
const otherHelper = require('../helper/others.helper');
const apiCallHelper = require('../helper/apicall.helper');
const { getSetting } = require('../helper/settings.helper');

const reCaptchaValidator = {};

reCaptchaValidator.validate = async (req, res, next) => {
  try {
    let code = req.body.reCaptcha;
    let code_android = req.body.reCaptcha_android;
    let code_ios = req.body.reCaptcha_iOS;
    let secretKey = await getSetting('auth', 'recaptcha', 'secret_key');
    let checkrecaptcha = await getSetting('auth', 'recaptcha', 'check');
    let secretKey_mobile = await getSetting('auth', 'recaptcha', 'secret_key_mobile');
    let secretKey_ios = await getSetting('auth', 'recaptcha', 'secret_key_ios');
    if (checkrecaptcha == false) {
      next();
    } else {
      if (code) {
        const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${code}&remoteip=${req.connection.remoteAddress}`;
        let verified = await apiCallHelper.requestThirdPartyApi(req, verifyUrl, null, null, 'POST', next);
        if (!(verified && verified.success)) {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { reCaptcha: 'invalid Captcha Validation ' }, 'Verify you are human1', null);
        } else {
          next();
        }
      } else if (code_android) {
        const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey_mobile}&response=${code_android}&remoteip=${req.connection.remoteAddress}`;
        let verified = await apiCallHelper.requestThirdPartyApi(req, verifyUrl, null, null, 'POST', next);
        if (!(verified && verified.success)) {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { reCaptcha: 'invalid Captcha Validation ' }, 'Verify you are human2', null);
        } else {
          next();
        }
      } else if (code_ios) {
        const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey_ios}&response=${code_ios}&remoteip=${req.connection.remoteAddress}`;
        let verified = await apiCallHelper.requestThirdPartyApi(req, verifyUrl, null, null, 'POST', next);
        if (!(verified && verified.success)) {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { reCaptcha: 'invalid Captcha Validation ' }, 'Verify you are human3', null);
        } else {
          next();
        }
      } else {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { reCaptcha: 'invalid Captcha Validation ' }, 'Verify you are human4', null);
      }
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = reCaptchaValidator;
