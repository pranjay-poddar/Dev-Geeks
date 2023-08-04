/*
 *
 * BlogManagePage actions
 *
 */

import * as types from './constants';

export const setValue = payload => ({
  type: types.SET_VALUE,
  payload,
});
export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const setTagValue = payload => ({
  type: types.SET_TAG_VALUE,
  payload,
});
export const setMetaTagValue = payload => ({
  type: types.SET_META_TAG_VALUE,
  payload,
});
export const setMetaKeywordValue = payload => ({
  type: types.SET_META_KEYWORD_VALUE,
  payload,
});
export const setCategoryValue = payload => ({
  type: types.SET_CATEGORY_VALUE,
  payload,
});
export const setAuthorValue = payload => ({
  type: types.SET_AUTHOR_VALUE,
  payload,
});
export const clearOne = payload => ({
  type: types.CLEAR_ONE,
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

export const loadCategoryRequest = payload => ({
  type: types.LOAD_CATEGORY_REQUEST,
  payload,
});
export const loadCategorySuccess = payload => ({
  type: types.LOAD_CATEGORY_SUCCESS,
  payload,
});
export const loadCategoryFailure = payload => ({
  type: types.LOAD_CATEGORY_FAILURE,
  payload,
});

export const loadUsersRequest = payload => ({
  type: types.LOAD_USERS_REQUEST,
  payload,
});
export const loadUserSuccess = payload => ({
  type: types.LOAD_USERS_SUCCESS,
  payload,
});
export const loadUserFailure = payload => ({
  type: types.LOAD_USERS_FAILURE,
  payload,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});

export const setErrorValue = payload => ({
  type: types.SET_ERROR_VALUE,
  payload,
});

export const setUpdateCalled = payload => ({
  type: types.SET_UPDATE_CALLED,
  payload,
});
