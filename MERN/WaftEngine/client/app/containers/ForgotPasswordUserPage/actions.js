/*
 *
 * ForgotPasswordUserPage actions
 *
 */

import * as types from './constants';

export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});
export const clearStore = payload => ({ type: types.CLEAR_STORE, payload });

export const clearError = payload => ({ type: types.CLEAR_ERROR, payload });

export const forgotPasswordRequest = payload => ({
  type: types.FORGOT_PASSWORD_REQUEST,
  payload,
});
export const forgotPasswordSuccess = payload => ({
  type: types.FORGOT_PASSWORD_SUCCESS,
  payload,
});
export const forgotPasswordFailure = payload => ({
  type: types.FORGOT_PASSWORD_FAILURE,
  payload,
});

export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION,
  };
}
