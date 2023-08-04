import * as types from './constants';

export const loadFAQRequest = payload => ({
  type: types.LOAD_FAQ_REQUEST,
  payload,
});
export const loadFAQSuccess = payload => ({
  type: types.LOAD_FAQ_SUCCESS,
  payload,
});
export const loadFAQFailure = payload => ({
  type: types.LOAD_FAQ_FAILURE,
  payload,
});
