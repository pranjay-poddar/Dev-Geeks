/*
 *
 * MenuManage actions
 *
 */

import * as types from './constants';

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

// to load individual menu data
export const loadMenuRequest = payload => ({
  type: types.LOAD_MENU_REQUEST,
  payload,
});
export const loadMenuSuccess = payload => ({
  type: types.LOAD_MENU_SUCCESS,
  payload,
});
export const loadMenuFailure = payload => ({
  type: types.LOAD_MENU_FAILURE,
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

export const addEditRequest2 = payload => ({
  type: types.ADD_EDIT_REQUEST_2,
  payload,
});
export const addEditSuccess2 = payload => ({
  type: types.ADD_EDIT_SUCCESS_2,
  payload,
});
export const addEditFailure2 = payload => ({
  type: types.ADD_EDIT_FAILURE_2,
  payload,
});

export const addEditChildRequest = payload => ({
  type: types.ADD_EDIT_CHILD_REQUEST,
  payload,
});
export const addEditChildSuccess = payload => ({
  type: types.ADD_EDIT_CHILD_SUCCESS,
  payload,
});
export const addEditChildFailure = payload => ({
  type: types.ADD_EDIT_CHILD_FAILURE,
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

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});

export const setChildValue = payload => ({
  type: types.SET_CHILD_VALUE,
  payload,
});

export const setLoadChild = payload => ({
  type: types.SET_LOAD_CHILD,
  payload,
});

export const clearSubMenu = () => ({
  type: types.CLEAR_SUB_MENU,
});
export const clearOne = () => ({
  type: types.CLEAR_ONE,
});

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const clearQuery = () => ({
  type: types.CLEAR_QUERY,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});

export const showSubMenu = payload => ({
  type: types.SHOW_SUB_MENU,
  payload,
});

export const deleteMenuItemRequest = payload => ({
  type: types.DELETE_MENU_ITEM_REQUEST,
  payload,
});
export const deleteMenuItemSuccess = payload => ({
  type: types.DELETE_MENU_ITEM_SUCCESS,
  payload,
});
export const deleteMenuItemFailure = payload => ({
  type: types.DELETE_MENU_ITEM_FAILURE,
  payload,
});
