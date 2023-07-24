/*
 *
 * AdminModuleManage actions
 *
 */

import * as types from './constants';

export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION,
  };
}

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});

export const setAccessValue = payload => ({
  type: types.SET_ACCESS_VALUE,
  payload,
});
export const clearOne = () => ({
  type: types.CLEAR_ONE,
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

export const loadAccessRequest = payload => ({
  type: types.LOAD_ACCESS_REQUEST,
  payload,
});
export const loadAccessSuccess = payload => ({
  type: types.LOAD_ACCESS_SUCCESS,
  payload,
});
export const loadAccessFailure = payload => ({
  type: types.LOAD_ACCESS_FAILURE,
  payload,
});

export const updateAccessRequest = payload => ({
  type: types.UPDATE_ACCESS_REQUEST,
  payload,
});
export const updateAccessSuccess = payload => ({
  type: types.UPDATE_ACCESS_SUCCESS,
  payload,
});
export const updateAccessFailure = payload => ({
  type: types.UPDATE_ACCESS_FAILURE,
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
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});

export const loadSubModuleRequest = payload => ({
  type: types.LOAD_SUB_MODULE_REQUEST,
  payload,
});
export const loadSubModuleSuccess = payload => ({
  type: types.LOAD_SUB_MODULE_SUCCESS,
  payload,
});
export const loadSubModuleFailure = payload => ({
  type: types.LOAD_SUB_MODULE_FAILURE,
  payload,
});

export const setAccessTypeChange = payload => ({
  type: types.SET_ACCESS_TYPE_CHANGE,
  payload,
});

export const setAdminRoutes = payload => ({
  type: types.SET_ADMIN_ROUTES,
  payload,
});

export const removeAdminRoutes = payload => ({
  type: types.REMOVE_ADMIN_ROUTES,
  payload,
});

export const addAdminRoutes = payload => ({
  type: types.ADD_ADMIN_ROUTES,
  payload,
});

export const setServerRouteMethod = payload => ({
  type: types.SET_SERVER_ROUTE_METHOD,
  payload,
});

export const setServerRouteChange = payload => ({
  type: types.SET_SERVER_ROUTE_CHANGE,
  payload,
});

export const addServerRoutes = payload => ({
  type: types.ADD_SERVER_ROUTES,
  payload,
});

export const removeServerRoutes = payload => ({
  type: types.REMOVE_SERVER_ROUTES,
  payload,
});

export const setAccessUpdate = payload => ({
  type: types.SET_ACCESS_UPDATE,
  payload,
});
