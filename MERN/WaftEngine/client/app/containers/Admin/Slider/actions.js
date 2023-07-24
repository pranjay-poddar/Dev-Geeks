import * as types from './constants';

export const setOneValue = (payload) => ({
  type: types.SET_ONE_VALUE,
  payload,
});

export const setArrayValue = (payload) => ({
  type: types.SET_ARRAY_VALUE,
  payload,
});
export const clearOne = (payload) => ({
  type: types.CLEAR_ONE,
  payload,
});

export const setQueryValue = (payload) => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const setQueryObj = (payload) => ({
  type: types.SET_QUERY_OBJ,
  payload,
});
export const clearQuery = (payload) => ({
  type: types.CLEAR_QUERY,
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
export const loadMediaRequest = (payload) => ({
  type: types.LOAD_MEDIA_REQUEST,
  payload,
});
export const loadMediaSuccess = (payload) => ({
  type: types.LOAD_MEDIA_SUCCESS,
  payload,
});
export const loadMediaFailure = (payload) => ({
  type: types.LOAD_MEDIA_FAILURE,
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

export const deleteOneRequest = (payload) => ({
  type: types.DELETE_ONE_REQUEST,
  payload,
});
export const deleteOneSuccess = (payload) => ({
  type: types.DELETE_ONE_SUCCESS,
  payload,
});
export const deleteOneFailure = (payload) => ({
  type: types.DELETE_ONE_FAILURE,
  payload,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});
export const setSliderValue = (payload) => ({
  type: types.SET_SLIDER_VALUE,
  payload,
});
