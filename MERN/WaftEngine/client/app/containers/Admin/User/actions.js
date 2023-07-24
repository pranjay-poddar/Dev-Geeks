/*
 *
 * User actions
 *
 */

import * as types from './constants';

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const clearOne = () => ({
  type: types.CLEAR_ONE,
});

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const setQueryObj = payload => ({
  type: types.SET_QUERY_OBJ,
  payload,
});
export const clearQuery = payload => ({
  type: types.CLEAR_QUERY,
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

export const addEditRequest = payload => ({
  type: types.ADD_EDIT_REQUEST,
  payload,
});
export const addEditSuccess = payload => ({
  type: types.ADD_EDIT_SUCCESS,
  payload,
});
export const addEditFailure = payload => ({
  type: types.ADD_EDIT_FAILURE,
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

export const loadAllRolesRequest = payload => ({
  type: types.LOAD_ALL_ROLES_REQUEST,
  payload,
});
export const loadAllRolesSuccess = payload => ({
  type: types.LOAD_ALL_ROLES_SUCCESS,
  payload,
});
export const loadAllRolesFailure = payload => ({
  type: types.LOAD_ALL_ROLES_FAILURE,
  payload,
});

export const updatePasswordRequest = payload => ({
  type: types.UPDATE_PASSWORD_REQUEST,
  payload,
});
export const updatePasswordSuccess = payload => ({
  type: types.UPDATE_PASSWORD_SUCCESS,
  payload,
});
export const updatePasswordFailure = payload => ({
  type: types.UPDATE_PASSWORD_FAILURE,
  payload,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});
