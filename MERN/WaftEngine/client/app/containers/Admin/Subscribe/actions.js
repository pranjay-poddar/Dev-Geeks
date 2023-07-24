/*
 *
 * Subscribe actions
 *
 */

import * as types from './constants';

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const loadSubscriberRequest = payload => ({
  type: types.LOAD_SUBSCRIBER_REQUEST,
  payload,
});
export const loadSubscriberSuccess = payload => ({
  type: types.LOAD_SUBSCRIBER_SUCCESS,
  payload,
});
export const loadSubscriberFailure = payload => ({
  type: types.LOAD_SUBSCRIBER_FAILURE,
  payload,
});
export const loadOneRequest = payload => ({
  type: types.LOAD_ONE_REQUEST,
  payload,
});
export const loadOneSuccess = payload => ({
  type: types.LOAD_ONE_SUCCESS,
  payload,
});
export const loadOneFailure = payload => ({
  type: types.LOAD_ONE_FAILURE,
  payload,
});
export const deleteOneRequest = payload => ({
  type: types.DELETE_ONE_REQUEST,
  payload,
});
export const deleteOneSuccess = payload => ({
  type: types.DELETE_ONE_SUCCESS,
  payload,
});
export const deleteOneFailure = payload => ({
  type: types.DELETE_ONE_FAILURE,
  payload,
});
