/*
 *
 * SignupUserPage actions
 *
 */

import * as types from './constants';

export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});
export const clearStore = payload => ({ type: types.CLEAR_STORE, payload });

export const signupRequest = payload => ({
  type: types.SIGNUP_REQUEST,
  payload,
});
export const signupSuccess = payload => ({
  type: types.SIGNUP_SUCCESS,
  payload,
});
export const signupFailure = payload => ({
  type: types.SIGNUP_FAILURE,
  payload,
});

export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION,
  };
}

export const signupWithFbRequest = payload => ({
  type: types.SIGNUP_WITH_FB_REQUEST,
  payload,
});
export const signupWithFbSuccess = payload => ({
  type: types.SIGNUP_WITH_FB_SUCCESS,
  payload,
});
export const signupWithFbFailure = payload => ({
  type: types.SIGNUP_WITH_FB_FAILURE,
  payload,
});

export const signupWithGoogleRequest = payload => ({
  type: types.SIGNUP_WITH_GOOGLE_REQUEST,
  payload,
});
export const signupWithGoogleSuccess = payload => ({
  type: types.SIGNUP_WITH_GOOGLE_SUCCESS,
  payload,
});
export const signupWithGoogleFailure = payload => ({
  type: types.SIGNUP_WITH_GOOGLE_FAILURE,
  payload,
});
