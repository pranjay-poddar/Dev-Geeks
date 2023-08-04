'use strict';
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
const useragent = require('useragent');
const requestIp = require('request-ip');
const loginLogSch = require('../modules/user/loginlogs/loginlogSchema');
const otherHelper = require('../helper/others.helper');
const accessSch = require('../modules/role/accessSchema');
const modulesSch = require('../modules/role/moduleSchema');
const rolesSch = require('../modules/role/roleSchema');
const userSch = require('../modules/user/userSchema');
const authMiddleware = {};
const isEmpty = require('../validation/isEmpty');
const { getSetting } = require('../helper/settings.helper');

authMiddleware.retrieveClientInfo = async (req, res, next) => {
  try {
    let platform = req.headers['platform'];
    if (platform) {
      if (platform == 'android' || platform == 'ios') {
      } else {
        platform = 'web';
      }
    } else {
      platform = 'web';
    }
    req.platform = platform;
    next();
  } catch (err) {
    next(err);
  }
};
authMiddleware.authentication = async (req, res, next) => {
  try {
    const secretOrKey = await getSetting('auth', 'token', 'secret_key');
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    if (token && token.length) {
      token = token.replace('Bearer ', '');
      const d = await jwt.verify(token, secretOrKey);
      req.user = d;
      let passed = await loginLogSch.findOne({ token, is_active: true });
      if (passed) {
        return next();
      } else {
        return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'Session Expired', null);
      }
    }
    return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, token, 'token not found', null);
  } catch (err) {
    return next(err);
  }
};

authMiddleware.authenticationForLogout = async (req, res, next) => {
  try {
    const secretOrKey = await getSetting('auth', 'token', 'secret_key');
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    if (token && token.length) {
      token = token.replace('Bearer ', '');
      const d = await jwt.verify(token, secretOrKey);
      req.user = d;
      return next();
    }
    return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, token, 'token not found', null);
  } catch (err) {
    return next(err);
  }
};
authMiddleware.authorization = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'User Information Not found', null);
    }
    const role = await rolesSch.find({ _id: { $in: user.roles } }, { _id: 1 });
    let path = req.baseUrl + req.route.path;
    if (path.substr(path.length - 1) === '/') {
      path = path.slice(0, path.length - 1);
    }
    const method = req.method;
    const modules_array = await modulesSch.find(
      {
        path: {
          $elemMatch: {
            server_routes: {
              $elemMatch: { method: method, route: path },
            },
          },
        },
      },
      { 'path.$': 1 },
    );
    let moduleId = [];
    if (!isEmpty(modules_array)) {
      for (let k = 0; k < modules_array.length; k++) {
        moduleId.push(modules_array[k].path[0]._id);
      }
    } else {
      return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'Module Access Restricted', null);
    }
    if (role && role.length && moduleId) {
      const access = await accessSch.findOne({ is_active: true, role_id: { $in: role }, access_type: { $in: moduleId } });
      if (access && access.access_type) {
        return next();
      }
      return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'Action not allowed for you', null);
    } else {
      return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'Access Denied', null);
    }
  } catch (err) {
    next(err);
  }
};
authMiddleware.getClientInfo = async (req, res, next) => {
  let info = {};

  let agent = useragent.parse(req.headers['user-agent']);
  // let another = useragent.fromJSON(JSON.stringify(agent));

  info.browser = agent.toAgent().toString();
  info.os = agent.os.toString();
  info.device = agent.device.toString();

  info.ip = requestIp.getClientIp(req);
  // on localhost you'll see 127.0.0.1 if you're using IPv4
  // or ::1, ::ffff:127.0.0.1 if you're using IPv6

  req.client_info = info;
  return next();
};

authMiddleware.isPublicFacebookRegistrationAllow = async (req, res, next) => {
  try {
    let checkis_public_registration = await getSetting('auth', 'auth', 'is_public_registration');
    let checkis_fblogin = await getSetting('auth', 'facebook', 'allow_login');
    if (checkis_public_registration == false || checkis_fblogin == false) {
      return otherHelper.sendResponse(res, HttpStatus.NOT_ACCEPTABLE, false, null, null, 'facebook login function disabled', 'null');
    } else {
      return next();
    }
  } catch (err) {
    next(err);
  }
};

authMiddleware.isPublicGoogleRegistrationAllow = async (req, res, next) => {
  try {
    let checkis_public_registration = await getSetting('auth', 'auth', 'is_public_registration');
    let checkis_googleLogin = await getSetting('auth', 'google', 'allow_login');
    if (checkis_public_registration == false || checkis_googleLogin == false) {
      return otherHelper.sendResponse(res, HttpStatus.NOT_ACCEPTABLE, false, null, null, 'google login function disabled', 'null');
    } else {
      return next();
    }
  } catch (err) {
    next(err);
  }
};
module.exports = authMiddleware;
