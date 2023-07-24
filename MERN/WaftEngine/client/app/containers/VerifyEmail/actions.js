/*
 *
 * VerifyEmail actions
 *
 */

import * as types from './constants';

export const loadVerifyEmailRequest = payload => ({
  type: types.LOAD_VERIFY_EMAIL_REQUEST,
  payload,
});
export const loadVerifyEmailSuccess = payload => ({
  type: types.LOAD_VERIFY_EMAIL_SUCCESS,
  payload,
});
export const loadVerifyEmailFailure = payload => ({
  type: types.LOAD_VERIFY_EMAIL_FAILURE,
  payload,
});

export const resendMailRequest = payload => ({
  type: types.RESEND_MAIL_REQUEST,
  payload,
});
export const resendMailSuccess = payload => ({
  type: types.RESEND_MAIL_SUCCESS,
  payload,
});
export const resendMailFailure = payload => ({
  type: types.RESEND_MAIL_FAILURE,
  payload,
});
