const userSch = require('./userSchema');
const roleSch = require('../role/roleSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./userConfig');
const httpStatus = require('http-status');
const emailHelper = require('./../../helper/email.helper');
const twoFaHelper = require('./../../helper/2fa.helper');
const renderMail = require('./../template/templateController').internal;
const otherHelper = require('../../helper/others.helper');
const accessSch = require('../role/accessSchema');
const moduleSch = require('../role/moduleSchema');
const loginLogs = require('./loginlogs/loginlogController').internal;
const { getSetting } = require('../../helper/settings.helper');

const userController = {};

userController.PostUser = async (req, res, next) => {
  try {
    let user = req.body;
    if (user && user._id) {
      const update = await userSch.findByIdAndUpdate(user._id, {
        $set: user,
        updated_at: Date.now(),
      });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'user update success!', null);
    } else {
      user.email = user.email.toLowerCase();
      const newUser = new userSch(user);
      const userSave = await newUser.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, userSave, null, 'user add success!', null);
    }
  } catch (err) {
    next(err);
  }
};

userController.PostUserPwd = async (req, res, next) => {
  try {
    let user = {};
    const { email, name, email_verified, roles, bio } = req.body;
    user = { email: email.toLowerCase(), name, email_verified, roles, bio };
    let salt = await bcrypt.genSalt(10);
    let hashPwd = await bcrypt.hash(req.body.password, salt);
    if (req.body && req.body._id) {
      const update = await userSch.findByIdAndUpdate(req.body._id, {
        $set: { password: hashPwd, last_password_change_date: new Date() },
      });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'user password update success!', null);
    } else {
      user.password = hashPwd;
      user.last_password_change_date = new Date();
      const newUser = new userSch(user);
      const userSave = await newUser.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, userSave, null, 'user add success!', null);
    }
  } catch (err) {
    next(err);
  }
};
userController.getMultiFAStatus = async (req, res, next) => {
  try {
    const user = await userSch.findById(req.user.id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, { multi_fa: { email: { is_authenticate: user.multi_fa.email.is_authenticate }, google_authenticate: { is_authenticate: user.multi_fa.google_authenticate.is_authenticate } } }, null, 'Two FA status', null);
  } catch (err) {
    next(err);
  }
};
userController.postEmailFAStatus = async (req, res, next) => {
  try {
    const is_authenticate = req.body.is_authenticate;
    const user = await userSch.findByIdAndUpdate(req.user.id, { $set: { 'multi_fa.email.is_authenticate': is_authenticate } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { is_authenticate: is_authenticate }, null, 'Two FA status', null);
  } catch (err) {
    next(err);
  }
};

userController.postGoogleFAStatus = async (req, res, next) => {
  try {
    const is_authenticate = req.body.is_authenticate;
    let auth_secret = '';
    if (is_authenticate) {
      const otp = await twoFaHelper.generateMultiFactorAuthCode(req);
      auth_secret = otp.secret;
      const user = await userSch.findByIdAndUpdate(req.user.id, { $set: { 'multi_fa.google_authenticate.setup': is_authenticate, 'multi_fa.google_authenticate.auth_secret_setup': auth_secret } });
      return otherHelper.sendResponse(res, httpStatus.OK, true, { email: req.user.email, multi_fa: { google_authenticate: { auth_secret_setup: auth_secret, setup: is_authenticate, qrcode: otp.qrcode } } }, null, 'Two FA status', null);
    } else {
      const user = await userSch.findByIdAndUpdate(req.user.id, { $set: { 'multi_fa.google_authenticate.is_authenticate': is_authenticate } });
      return otherHelper.sendResponse(res, httpStatus.OK, true, { email: req.user.email, multi_fa: { google_authenticate: { is_authenticate: is_authenticate } } }, null, 'Two FA status', null);
    }
  } catch (err) {
    next(err);
  }
};
userController.verifyGoogleFAStatus = async (req, res, next) => {
  try {
    let user = await userSch.findById(req.user.id);
    const code = req.body.code;
    if (user.multi_fa.google_authenticate.setup) {
      const otp = await twoFaHelper.verifyMultiFactorAuthCode(code, user.multi_fa.google_authenticate.auth_secret_setup);
      if (otp) {
        user = await userSch.findByIdAndUpdate(req.user.id, { $set: { 'multi_fa.google_authenticate.is_authenticate': true, 'multi_fa.google_authenticate.setup': false, 'multi_fa.google_authenticate.auth_secret': user.multi_fa.google_authenticate.auth_secret_setup, 'multi_fa.google_authenticate.auth_secret_setup': '' } });
        return otherHelper.sendResponse(res, httpStatus.OK, true, { is_authenticate: true }, null, 'Two FA setup success', null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.UNAUTHORIZED, false, { code: 'Code mismatch' }, null, 'Please try another code', null);
      }
    }
    return otherHelper.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, { code: '' }, null, 'Something went wrong', null);
  } catch (err) {
    next(err);
  }
};
userController.CheckMail = async (req, res) => {
  let errors = {};
  const email = req.body.email.toLowerCase();
  const user = await userSch.findOne({ email });
  const data = { email };
  if (!user) {
    errors.email = 'Mail not found';
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
  }
  return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Mail found', null);
};

userController.GetAllUserGroupBy = async (req, res, next) => {
  try {
    const role = await roleSch.find({ is_deleted: false }).select('role_title');
    let user = await userSch.find({ is_deleted: false });
    let totalData = await userSch.countDocuments({ is_deleted: false });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, { role, user }, 'users by group by get success!', 1, 1, totalData);
  } catch (err) {
    next(err);
  }
};

userController.GetAllUser = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_name) {
      searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_email) {
      searchQuery = { email: { $regex: req.query.find_email, $options: 'i' }, ...searchQuery };
    }
    const roles = ['5bf7af0a736db01f8fa21a25', '5bf7ae3694db051f5486f845', '5def4c1cb3f6c12264bcf622'];
    if (req.query.find_is_active == 'true' || req.query.find_is_active == 'false') {
      searchQuery = { is_active: req.query.find_is_active, ...searchQuery };
    }
    if (req.query.find_roles) {
      searchQuery = { roles: { $in: [req.query.find_roles] }, ...searchQuery };
    }
    if (req.query.filter_author) {
      searchQuery = { roles: { $in: roles }, ...searchQuery };
    }
    selectQuery = 'name email password bio email_verified roles is_active';
    populate = [{ path: 'roles', select: 'role_title' }];
    const pulledData = await otherHelper.getQuerySendResponse(userSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, config.gets, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

userController.GetUserDetail = async (req, res, next) => {
  try {
    const user = await userSch.findById(req.params.id, {
      email_verified: 1,
      roles: 1,
      name: 1,
      email: 1,
      bio: 1,
      updated_at: 1,
      is_active: 1,
    });
    const role = await roleSch.find({ is_deleted: false }, { role_title: 1, _id: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { users: user, roles: role }, null, config.get, null);
  } catch (err) {
    next(err);
  }
};

userController.Register = async (req, res, next) => {
  const public_register_allow = await getSetting('auth', 'user', 'is_public_registration');
  if (!public_register_allow) {
    return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, null, 'Public Registration not allowed.', null);
  }
  let email = req.body.email && req.body.email.toLowerCase();
  const user = await userSch.findOne({ email: email });
  if (user) {
    const errors = { email: 'Email already exists' };
    const data = { email: email };
    return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
  } else {
    const { name, password, gender } = req.body;
    const newUser = new userSch({ name, email, password, gender });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    newUser.email_verification_code = otherHelper.generateRandomHexString(12);
    newUser.email_verified = false;
    const temp = await getSetting('auth', 'roles', 'public_register_role');
    newUser.roles.push(temp);
    newUser.last_password_change_date = new Date();
    newUser.email_verified_request_date = new Date();
    const user = await newUser.save();
    const public_register_email_template = await getSetting('template', 'email', 'public_register_email_template');
    const renderedMail = await renderMail.renderTemplate(
      public_register_email_template,
      {
        name: newUser.name,
        email: newUser.email,
        code: newUser.email_verification_code,
      },
      newUser.email,
    );
    if (renderMail.error) {
      console.log('render mail error: ', renderMail.error);
    } else {
      emailHelper.send(renderedMail, next);
    }
    const force_allow_email_verify = await getSetting('user', 'email', 'force_allow_email_verify');
    if (force_allow_email_verify) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, { email_verified: false, email: email }, null, 'Verification email sent.', null);
    }
    const { token, payload } = await userController.validLoginResponse(req, user, next);
    return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
  }
};
userController.validLoginResponse = async (req, user, next) => {
  try {
    let accesses = await accessSch.find({ role_id: user.roles, is_active: true }, { access_type: 1, _id: 0 });
    let routes = [];
    if (accesses && accesses.length) {
      const access = accesses.map((a) => a.access_type).reduce((acc, curr) => [...curr, ...acc]);
      const routers = await moduleSch.find({ 'path._id': access }, { 'path.admin_routes': 1, 'path.access_type': 1 });
      for (let i = 0; i < routers.length; i++) {
        for (let j = 0; j < routers[i].path.length; j++) {
          routes.push(routers[i].path[j]);
        }
      }
    }
    const secretOrKey = await getSetting('auth', 'token', 'secret_key');
    var tokenExpireTime = await getSetting('auth', 'token', 'expiry_time');
    tokenExpireTime = Number.parseInt(tokenExpireTime);
    // Create JWT payload

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      email_verified: user.email_verified,
      roles: user.roles,
      gender: user.gender,
      is_two_fa: user.is_two_fa,
      image: user.image,
    };
    // Sign Token
    let token = await jwt.sign(payload, secretOrKey, {
      expiresIn: tokenExpireTime,
    });
    loginLogs.addloginlog(req, token, next);
    token = `Bearer ${token}`;
    payload.routes = routes;
    return { token, payload };
  } catch (err) {
    next(err);
  }
};
userController.RegisterFromAdmin = async (req, res, next) => {
  try {
    const user = await userSch.findOne({ email: req.body.email, is_deleted: false });
    if (user) {
      errors.email = 'Email already exists';
      const data = { email: req.body.email };
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
    } else {
      if (req.file) {
        req.body.image = req.file;
      }
      const { name, email, password, date_of_birth, bio, location, phone, description, is_active, email_verified, roles, image, company_name, company_location, company_established, company_phone_no } = req.body;
      const newUser = new User({ name, email, password, date_of_birth, bio, description, email_verified, is_active, roles, image, location, phone, company_name, company_location, company_established, company_phone_no });
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.email_verified = false;
          newUser.roles = roles;
          newUser.added_by = req.user.id;
          newUser.is_active = true;
          newUser.is_added_by_admin = true;
          const user = await newUser.save();
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            email_verified: user.email_verified,
            roles: user.roles,
            gender: user.gender,
          };
          const msg = config.registerAdmin;
          return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, msg, null);
        });
      });
    }
  } catch (err) {
    return next(err);
  }
};

userController.UpdateUserDetail = async (req, res, next) => {
  try {
    const { name, date_of_birth, email_verified, roles, bio, description, phone, location, company_name, company_location, company_established, company_phone_no } = req.body;
    const id = req.params.id;

    let newData = { name, date_of_birth, email_verified, roles, bio, description, phone, location, company_name, company_location, company_established, company_phone_no, updated_at: new Date() };

    if (req.file) {
      newData.image = req.file;
    }

    const updateUser = await userSch.findByIdAndUpdate(id, { $set: newData });
    const msg = 'User Update Success';
    const msgFail = 'User not found';

    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, req.body, null, msg, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, msgFail, null);
    }
  } catch (err) {
    return next(err);
  }
};

userController.Verifymail = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const code = req.body.code;
    const userVerified = await userSch.findOne({ email: email, email_verified: true });
    if (userVerified && userVerified._id) {
      let errors = {};
      errors.verified = 'Email is already verified';
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, errors.verified, null);
    }
    const user = await userSch.findOne({ email: email, email_verification_code: code });
    const data = { email };
    if (!user) {
      let errors = {};
      errors.email = 'Invalid Verification Code or Wrong Email Id';
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, data, null, errors.email, null);
    }
    const d = await userSch.findByIdAndUpdate(user._id, { $set: { email_verified: true }, $unset: { email_verification_code: 1 } }, { new: true });
    const { token, payload } = await userController.validLoginResponse(req, d, next);
    return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, config.emailVerify, token);
  } catch (err) {
    next(err);
  }
};

userController.ResendVerificationCode = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const user = await userSch.findOne({ email });
    if (user) {
      if (user.email_verified) {
        return otherHelper.sendResponse(res, httpStatus.OK, true, { email }, null, 'Email Already Verified', null);
      } else {
        const currentDate = new Date();
        const diff = parseInt((currentDate - user.email_verified_request_date) / (1000 * 60)); //in minute
        if (diff < 10) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, { email }, null, 'Email Already Sent', null);
        }
        const email_verification_code = otherHelper.generateRandomHexString(6);
        const newUser = await userSch.findOneAndUpdate({ email: email }, { $set: { email_verification_code, email_verified: false, email_verified_request_date: currentDate } }, { new: true });
        const verify_mail_template = await getSetting('template', 'email', 'verify_mail_template');
        const renderedMail = await renderMail.renderTemplate(
          verify_mail_template,
          {
            name: user.name,
            email: user.email,
            code: email_verification_code,
          },
          user.email,
        );
        if (renderMail.error) {
          console.log('render mail error: ', renderMail.error);
        } else {
          emailHelper.send(renderedMail, next);
          const dataReturn = { email: user.email, name: user.name };
          return otherHelper.sendResponse(res, httpStatus.OK, true, dataReturn, null, 'Email verification code Sent!', null);
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

userController.VerifyServerMail = async (req, res, next) => {
  try {
    const { id, code } = req.params;
    const user = await userSch.findOne({ _id: id, email_verification_code: code });
    if (!user) {
      return res.redirect(302, 'http://localhost:5460?verify=false');
    }
    const d = await userSch.findByIdAndUpdate(user._id, { $set: { email_verified: true }, $unset: { email_verification_code: 1 } }, { new: true });
    const payload = {
      id: user._id,
      iss: 'http://localhost:5050',
      name: user.name,
      email: user.email,
      email_verified: true,
      roles: user.roles,
      gender: user.gender,
    };
    // Sign Token
    let secret_key = await getSetting('auth', 'token', 'secret_key');
    let token_expire_time = await getSetting('auth', 'token', 'expiry_time');
    token_expire_time = Number.parseInt(token_expire_time);
    jwt.sign(payload, secret_key, { expiresIn: token_expire_time }, (err, token) => {
      const msg = config.emailVerify;
      token = `${token}`;

      res.cookie('token', token); // add cookie here
      res.cookie('email', user.email); // add cookie here
      return res.redirect(302, 'http://localhost:5050?verify=true');
    });
  } catch (err) {
    next(err);
  }
};

userController.ForgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const errors = {};
    const user = await userSch.findOne({ email });
    const data = { email };
    if (!user) {
      errors.email = 'Email not found';
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    const currentDate = new Date();
    if (user.password_reset_request_date) {
      const diff = parseInt((currentDate - user.password_reset_request_date) / (1000 * 60)); //in minute
      if (diff < 10) {
        return otherHelper.sendResponse(res, httpStatus.OK, true, { email }, null, 'Email Already Sent, Check your Inbox', null);
      }
    }
    user.password_reset_code = otherHelper.generateRandomHexString(6);
    user.password_reset_request_date = currentDate;
    const update = await userSch.findByIdAndUpdate(
      user._id,
      {
        $set: {
          password_reset_code: user.password_reset_code,
          password_reset_request_date: user.password_reset_request_date,
        },
      },
      { new: true },
    );
    const forgot_password_mail_template = await getSetting('template', 'email', 'forgot_password_mail_template');
    const renderedMail = await renderMail.renderTemplate(
      forgot_password_mail_template,
      {
        name: user.name,
        email: user.email,
        code: user.password_reset_code,
      },
      user.email,
    );

    if (renderMail.error) {
      console.log('render mail error: ', renderMail.error);
    } else {
      emailHelper.send(renderedMail, next);
    }

    const msg = `Password Reset Code For ${email} is sent to email`;
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, msg, null);
  } catch (err) {
    next(err);
  }
};

userController.ResetPassword = async (req, res, next) => {
  try {
    let { email, code, password } = req.body;
    email = email.toLowerCase();
    const user = await userSch.findOne({ email, password_reset_code: code });
    const data = { email };
    const errors = {};
    if (!user) {
      errors.email = 'Invalid Password Reset Code';
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    let salt = await bcrypt.genSalt(10);
    let hashPw = await bcrypt.hash(password, salt);
    const d = await userSch.findByIdAndUpdate(user._id, { $set: { password: hashPw, last_password_change_date: Date.now(), email_verified: true }, $unset: { password_reset_code: 1, password_reset_request_date: 1 } }, { new: true });
    // Create JWT payload

    const { token, payload } = await userController.validLoginResponse(req, d, next);
    return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
  } catch (err) {
    return next(err);
  }
};

userController.Login = async (req, res, next) => {
  try {
    let errors = {};
    const password = req.body.password;
    let email = req.body.email.toLowerCase();
    const user = await userSch.findOne({ email }).populate([{ path: 'roles', select: 'role_title' }]);

    if (!user) {
      errors.email = 'User not found';
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, errors, errors.email, null);
    } else {
      if (!user.is_active) {
        errors.inactive = 'Please Contact Admin to reactivate your account';
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, errors, errors.inactive, null);
      }
      const force_allow_email_verify = await getSetting('user', 'email', 'force_allow_email_verify');
      if (force_allow_email_verify && !user.email_verified) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, { email: email, email_verified: false }, null, 'Please Verify your Email', null);
      }
      // Check Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        let success = true;
        let responseData = { multi_fa: { google_authenticate: { is_authenticate: false }, email: { is_authenticate: false } } };
        if (user.multi_fa.google_authenticate.is_authenticate) {
          success = false;
          responseData.multi_fa.google_authenticate.is_authenticate = true;
          // return otherHelper.sendResponse(res, httpStatus.OK, true, { email: email, _id: user._id, is_two_fa_ga: true }, null, 'Enter Code Sent to Email', null);
        }
        if (user.multi_fa.email.is_authenticate) {
          success = false;
          responseData.multi_fa.email.is_authenticate = true;
          const two_fa_code = otherHelper.generateRandomHexString(6);
          const two_fa_time = new Date();
          const d = await userSch.findByIdAndUpdate(user._id, { $set: { 'multi_fa.email.code': two_fa_code, 'multi_fa.email.time': two_fa_time } });
          const two_fa_email_template = await getSetting('template', 'email', 'two_fa_email_template');
          const renderedMail = await renderMail.renderTemplate(
            two_fa_email_template,
            {
              name: user.name,
              email: user.email,
              code: two_fa_code,
            },
            user.email,
          );
          if (renderMail.error) {
            console.log('render mail error: ', renderMail.error);
          } else {
            const da = await emailHelper.send(renderedMail, next);
          }
          if (!success) {
          }
        }
        if (success) {
          const { token, payload } = await userController.validLoginResponse(req, user, next);
          return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
        } else {
          return otherHelper.sendResponse(res, httpStatus.OK, true, { email: user.email, ...responseData }, null, 'Enter Code', null);
          // const { token, payload } = await userController.validLoginResponse(req, user, next);
          // return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
        }
      } else {
        errors.password = 'Password incorrect';
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.password, null);
      }
    }
  } catch (err) {
    next(err);
  }
};
userController.LoginAfterMultiFa = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await userSch.findOne({ email: data.email.toLowerCase() });
    if (user) {
      let err = { multi_fa: {} };
      let success = true;
      if (user.multi_fa && user.multi_fa.google_authenticate && user.multi_fa.google_authenticate.is_authenticate) {
        if (data.multi_fa && data.multi_fa.google_authenticate && data.multi_fa.google_authenticate.code) {
          const otp = await twoFaHelper.verifyMultiFactorAuthCode(data.multi_fa.google_authenticate.code, user.multi_fa.google_authenticate.auth_secret);
          if (otp) {
          } else {
            success = false;
            err.multi_fa.google_authenticate = { code: 'Invalid Code' };
          }
        } else {
          err.multi_fa.google_authenticate = { code: 'Enter Code from Authenticator App' };
          success = false;
        }
      }
      if (user.multi_fa && user.multi_fa.email && user.multi_fa.email.is_authenticate) {
        if (data.multi_fa && data.multi_fa.email && data.multi_fa.email.code) {
          if (data.multi_fa.email.code == user.multi_fa.email.code) {
          } else {
            success = false;
            err.multi_fa.email = { code: 'Enter Valid Code Sent To Email' };
          }
        } else {
          success = false;
          err.multi_fa.email = { code: 'Enter Code Sent To Email' };
        }
      }
      if (success) {
        const { token, payload } = await userController.validLoginResponse(req, user, next);
        const d = await userSch.findByIdAndUpdate(user._id, { $unset: { 'multi_fa.email.code': 1, 'multi_fa.email.time': 1 } });
        return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
      } else {
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, err, 'Enter Valid Codes', null);
      }
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, { email: 'Email Not found' }, 'Email Not found', null);
    }
  } catch (err) {
    next(err);
  }
};
userController.LoginAfterTwoFa = async (req, res, next) => {
  try {
    let email = req.body.email.toLowerCase();
    const two_fa_code = req.body.two_fa_code;
    const user = await userSch.findOne({ email, two_fa_code });
    if (user) {
      const { token, payload } = await userController.validLoginResponse(req, user, next);
      const d = await userSch.findByIdAndUpdate(user._id, { $unset: { two_fa_code: 1, two_fa_time: 1 } });
      return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
    } else {
      let errors = { two_fa_code: 'Incorrect Code' };
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.two_fa_code, null);
    }
  } catch (err) {
    next(err);
  }
};
userController.LoginAfterTwoFaGa = async (req, res, next) => {
  try {
    let email = req.body.email.toLowerCase();
    const user = await userSch.findOne({ email, is_two_fa_ga: true });
    if (user) {
      const otp = await twoFaHelper.verifyMultiFactorAuthCode(req.body.code, user.two_fa_ga_auth_secret);
      if (otp) {
        const { token, payload } = await userController.validLoginResponse(req, user, next);
        const d = await userSch.findByIdAndUpdate(user._id, { $unset: { two_fa_code: 1, two_fa_time: 1 } });
        return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
      } else {
        let errors = { code: 'Incorrect Code' };
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.code, null);
      }
    } else {
      let errors = { email: 'email is not 2fa enabled' };
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.email, null);
    }
  } catch (err) {
    next(err);
  }
};
userController.Info = (req, res, next) => {
  return otherHelper.sendResponse(res, httpStatus.OK, true, req.user, null, null, null);
};

userController.GetProfile = async (req, res, next) => {
  try {
    let populate = [{ path: 'roles', select: '_id role_title' }];
    const userProfile = await userSch.findById(req.user.id, 'image name date_of_birth email added_at email_verified roles is_two_fa ').populate(populate);
    return otherHelper.sendResponse(res, httpStatus.OK, true, userProfile, null, null, null);
  } catch (err) {
    next(err);
  }
};

userController.postProfile = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file;
    }
    const { name, date_of_birth, bio, description, image, phone, location, is_two_fa, company_name, company_location, company_established, company_phone_no } = req.body;
    const updateUser = await userSch.findByIdAndUpdate(req.user.id, { $set: { name, date_of_birth, bio, image, description, phone, location, company_name, company_location, company_established, company_phone_no, updated_at: new Date() } }, { new: true });
    const msg = 'User Update Success';
    const msgfail = 'User not found.';
    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, { name, date_of_birth, bio, image, description, phone, location, company_name, company_location, company_established, company_phone_no }, null, msg, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, msgfail, null);
    }
  } catch (err) {
    return next(err);
  }
};

userController.changePassword = async (req, res, next) => {
  try {
    let errors = {};
    const { oldPassword, newPassword } = req.body;
    if (oldPassword == newPassword) {
      errors.oldPassword = 'Old and New password cannot be same';
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, null, null);
    }
    const user = await userSch.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (isMatch) {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(newPassword, salt);
      const dbRes = await userSch.findByIdAndUpdate(req.user.id, { $set: { password: hash, last_password_change_date: new Date() } }, { $new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, dbRes, null, 'Password Change Success', null);
    } else {
      errors.oldPassword = 'Old Password incorrect';
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, null, null);
    }
  } catch (err) {
    next(err);
  }
};

userController.loginGOath = async (req, res, next) => {
  let profile = req.user;
  profile.email = profile.email.toLowerCase();
  const currentDate = new Date();
  let user = await userSch.findOne({ email: profile.email });
  const random_password = await otherHelper.generateRandomHexString(10);
  if (user) {
    if (!user.email_verified) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(random_password, salt);
      user = await userSch.findByIdAndUpdate(user._id, { $set: { password: hash, email_verified: true, last_password_change_date: currentDate, register_method: profile.provider } });
      user.email_verified = true;
    } else {
      const { token, payload } = await userController.validLoginResponse(req, user, next);
      return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'Login Successfully', token);
    }
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(random_password, salt);
    const public_register_role = await getSetting('auth', 'roles', 'public_register_role');
    const newUser = new userSch({
      name: profile.name,
      email: profile.email,
      password: hash,
      email_verified: true,
      last_password_change_date: currentDate,
      register_method: profile.provider,
      roles: public_register_role,
    });
    user = await newUser.save();
  }

  const public_register_auth_template = await getSetting('template', 'email', 'public_register_auth_template');

  const renderedMail = await renderMail.renderTemplate(
    public_register_auth_template,
    {
      name: profile.name,
      email: profile.email,
      password: random_password,
      account: profile.provider,
    },
    profile.email,
  );
  if (renderMail.error) {
    console.log('render mail error: ', renderMail.error);
  } else {
    emailHelper.send(renderedMail, next);
  }
  const { token, payload } = await userController.validLoginResponse(req, user, next);
  return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'Register Successfully', token);
};

userController.selectMultipleData = async (req, res, next) => {
  try {
    const { user_id, type } = req.body;
    if (type == 'is_active') {
      const Data = await userSch.updateMany({ _id: { $in: user_id } }, [
        {
          $set: {
            is_active: { $not: '$is_active' },
          },
        },
      ]);
      return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
    } else if (type == 'email_verified') {
      const User = await userSch.updateMany({ _id: { $in: user_id } }, [
        {
          $set: {
            email_verified: { $not: '$email_verified' },
          },
        },
      ]);
      return otherHelper.sendResponse(res, httpStatus.OK, true, User, null, 'Status Change Success', null);
    } else {
      const User = await userSch.updateMany(
        { _id: { $in: user_id } },
        {
          $set: {
            is_deleted: true,
            deleted_at: new Date(),
          },
        },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, User, null, 'Multiple Data Delete Success', null);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = userController;
