/*
 *
 * Error actions
 *
 */

import * as types from './constants';

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const loadAllRequest = payload => ({
  type: types.LOAD_ALL_REQUEST,
  payload,
});

export const loadAllSuccess = payload => ({
  type: types.LOAD_ALL_SUCCESS,
  payload,
});

export const loadAllFailure = payload => ({
  type: types.LOAD_ALL_FAILURE,
  payload,
});
export const errorDeleteRequest = payload => ({
  type: types.ERROR_DELETE_REQUEST,
  payload,
});
export const errorDeleteSuccess = payload => ({
  type: types.ERROR_DELETE_SUCCESS,
  payload,
});
export const errorDeleteFailure = payload => ({
  type: types.ERROR_DELETE_FAILURE,
  payload,
});

export const deleteAllRequest = payload => ({
  type: types.DELETE_All_REQUEST,
  payload,
});
export const deleteAllSuccess = payload => ({
  type: types.DELETE_All_SUCCESS,
  payload,
});
export const deleteAllFailure = payload => ({
  type: types.DELETE_All_FAILURE,
  payload,
});
