/*
 *
 * ResetPasswordPage actions
 *
 */

import * as types from './constants';

export const loadResetRequest = payload => ({
  type: types.LOAD_RESET_REQUEST,
  payload,
});
export const loadResetSuccess = payload => ({
  type: types.LOAD_RESET_SUCCESS,
  payload,
});
export const loadResetFailure = payload => ({
  type: types.LOAD_RESET_FAILURE,
  payload,
});

export const setData = payload => ({
  type: types.SET_DATA,
  payload,
});
export const setErrors = payload => ({
  type: types.SET_ERRORS,
  payload,
});

export const clearErrors = payload => ({
  type: types.CLEAR_ERRORS,
  payload,
});
