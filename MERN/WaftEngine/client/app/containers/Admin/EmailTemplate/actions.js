/*
 *
 * Template actions
 *
 */
import * as types from './constants';

export const setQueryValue = (payload) => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const setOneValue = (payload) => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const clearOne = (payload) => ({
  type: types.CLEAR_ONE,
  payload,
});

export const loadAllRequest = (payload) => ({
  type: types.LOAD_ALL_REQUEST,
  payload,
});
export const loadAllSuccess = (payload) => ({
  type: types.LOAD_ALL_SUCCESS,
  payload,
});
export const loadAllFailure = (payload) => ({
  type: types.LOAD_ALL_FAILURE,
  payload,
});

export const loadOneRequest = (payload) => ({
  type: types.LOAD_ONE_REQUEST,
  payload,
});
export const loadOneSuccess = (payload) => ({
  type: types.LOAD_ONE_SUCCESS,
  payload,
});
export const loadOneFailure = (payload) => ({
  type: types.LOAD_ONE_FAILURE,
  payload,
});

export const addEditRequest = (payload) => ({
  type: types.ADD_EDIT_REQUEST,
  payload,
});
export const addEditSuccess = (payload) => ({
  type: types.ADD_EDIT_SUCCESS,
  payload,
});
export const addEditFailure = (payload) => ({
  type: types.ADD_EDIT_FAILURE,
  payload,
});
