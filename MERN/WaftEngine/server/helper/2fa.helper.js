(twoFactorAuthenticatorHelper => {
  'use strict';

  const speakeasy = require('speakeasy');
  const qrCode = require('qr-image');

  twoFactorAuthenticatorHelper.generateMultiFactorAuthCode = req => {
    try {
      let otpPathURLlabel = req.hostname + ':' + req.user.email;
      otpPathURLlabel = encodeURIComponent(otpPathURLlabel.trim().toLowerCase());
      const issuer = encodeURIComponent(req.hostname.trim().toLowerCase());
      const secret = speakeasy.generateSecret({
        length: 32,
        name: otpPathURLlabel,
        symbols: false,
        otpauth_url: false,
      });
      secret.otpauth_url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: otpPathURLlabel,
        issuer: issuer,
        encoding: 'base32',
      });

      const qr_svg = qrCode.svgObject(secret.otpauth_url, { type: 'svg' });
      req.session.totpAuthConfig = secret;
      return Promise.resolve({
        qrcode: qr_svg,
        secret: secret.base32,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  twoFactorAuthenticatorHelper.verifyMultiFactorAuthCode = (userToken, _tokenSecret) => {
    // Verify a given token

    // const userToken = req.body.code;
    try {
      const verified = speakeasy.totp.verify({
        secret: _tokenSecret,
        encoding: 'base32',
        token: userToken,
        window: 1,
      });
      // Returns true if the token matches
      if (verified) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (err) {
      return Promise.resolve(false);
    }
  };
})(module.exports);
