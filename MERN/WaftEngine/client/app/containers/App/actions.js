/*
 *
 * App actions
 *
 */

import * as types from './constants';

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const setToken = (token) => ({
  type: types.SET_TOKEN,
  payload: token,
});

export const sessionExpired = (token) => ({
  type: types.SESSION_EXPIRED,
  payload: token,
});

export const setExpired = (payload) => ({
  type: types.SET_EXPIRED,
  payload: payload,
});

export const networkError = (token) => ({
  type: types.NETWORK_ERROR,
  payload: token,
});

export const enqueueSnackbar = (notification) => ({
  type: types.ENQUEUE_SNACKBAR,
  payload: notification,
});

export const removeSnackbar = (payload) => ({
  type: types.REMOVE_SNACKBAR,
  payload,
});

export const logoutRequest = (payload) => ({
  type: types.LOGOUT_REQUEST,
  payload,
});
export const logoutSuccess = (payload) => ({
  type: types.LOGOUT_SUCCESS,
  payload,
});
export const logoutFailure = (payload) => ({
  type: types.LOGOUT_FAILURE,
  payload,
});

export const loadContentRequest = (payload) => ({
  type: types.LOAD_CONTENT_REQUEST,
  payload,
});
export const loadContentSuccess = (payload) => ({
  type: types.LOAD_CONTENT_SUCCESS,
  payload,
});
export const loadContentFailure = (payload) => ({
  type: types.LOAD_CONTENT_FAILURE,
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

export const loadSlideRequest = (payload) => ({
  type: types.LOAD_SLIDE_REQUEST,
  payload,
});
export const loadSlideSuccess = (payload) => ({
  type: types.LOAD_SLIDE_SUCCESS,
  payload,
});
export const loadSlideFailure = (payload) => ({
  type: types.LOAD_SLIDE_FAILURE,
  payload,
});
export const availableRequest = (payload) => ({
  type: types.LOAD_AVAILABLE_REQUEST,
  payload,
});
export const availableSuccess = (payload) => ({
  type: types.LOAD_AVAILABLE_SUCCESS,
  payload,
});
export const availableFailure = (payload) => ({
  type: types.LOAD_AVAILABLE_FAILURE,
  payload,
});
export const loadLatestBlogsRequest = (payload) => ({
  type: types.LOAD_LATEST_BLOGS_REQUEST,
  payload,
});
export const loadLatestBlogsSuccess = (payload) => ({
  type: types.LOAD_LATEST_BLOGS_SUCCESS,
  payload,
});
export const loadLatestBlogsFailure = (payload) => ({
  type: types.LOAD_LATEST_BLOGS_FAILURE,
  payload,
});

export const loadMenuRequest = (payload) => ({
  type: types.LOAD_MENU_REQUEST,
  payload,
});
export const loadMenuSuccess = (payload) => ({
  type: types.LOAD_MENU_SUCCESS,
  payload,
});
export const loadMenuFailure = (payload) => ({
  type: types.LOAD_MENU_FAILURE,
  payload,
});

export const loadFaqRequest = (payload) => ({
  type: types.LOAD_FAQ_REQUEST,
  payload,
});
export const loadFaqSuccess = (payload) => ({
  type: types.LOAD_FAQ_SUCCESS,
  payload,
});
export const loadFaqFailure = (payload) => ({
  type: types.LOAD_FAQ_FAILURE,
  payload,
});
