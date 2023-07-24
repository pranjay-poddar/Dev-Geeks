/*
 *
 * Dashboard actions
 *
 */

import * as types from './constants';

export const loadUserRequest = payload => ({
  type: types.LOAD_USER_REQUEST,
  payload,
});

export const loadUserSuccess = payload => ({
  type: types.LOAD_USER_SUCCESS,
  payload,
});

export const loadUserFailure = payload => ({
  type: types.LOAD_USER_FAILURE,
  payload,
});
export const loadErrorRequest = payload => ({
  type: types.LOAD_ERROR_REQUEST,
  payload,
});
export const loadErrorSuccess = payload => ({
  type: types.LOAD_ERROR_SUCCESS,
  payload,
});
export const loadErrorFailure = payload => ({
  type: types.LOAD_ERROR_FAILURE,
  payload,
});
export const loadInfoRequest = payload => ({
  type: types.LOAD_INFO_REQUEST,
  payload,
});
export const loadInfoSuccess = payload => ({
  type: types.LOAD_INFO_SUCCESS,
  payload,
});
export const loadInfoFailure = payload => ({
  type: types.LOAD_INFO_FAILURE,
  payload,
});
export const loadBlogRequest = payload => ({
  type: types.LOAD_BLOG_REQUEST,
  payload,
});
export const loadBlogSuccess = payload => ({
  type: types.LOAD_BLOG_SUCCESS,
  payload,
});
export const loadBlogFailure = payload => ({
  type: types.LOAD_BLOG_FAILURE,
  payload,
});

export const loadUserByRegisterRequest = payload => ({
  type: types.LOAD_USER_BY_REGISTER_REQUEST,
  payload,
});
export const loadUserByRegisterSuccess = payload => ({
  type: types.LOAD_USER_BY_REGISTER_SUCCESS,
  payload,
});
export const loadUserByRegisterFailure = payload => ({
  type: types.LOAD_USER_BY_REGISTER_FAILURE,
  payload,
});

export const loadBlogsByUserRequest = payload => ({
  type: types.LOAD_BLOGS_BY_USER_REQUEST,
  payload,
});
export const loadBlogsByUserSuccess = payload => ({
  type: types.LOAD_BLOGS_BY_USER_SUCCESS,
  payload,
});
export const loadBlogsByUserFailure = payload => ({
  type: types.LOAD_BLOGS_BY_USER_FAILURE,
  payload,
});

export const loadRecentUserRequest = payload => ({
  type: types.LOAD_RECENT_USER_REQUEST,
  payload,
});
export const loadRecentUserSuccess = payload => ({
  type: types.LOAD_RECENT_USER_SUCCESS,
  payload,
});
export const loadRecentUserFailure = payload => ({
  type: types.LOAD_RECENT_USER_FAILURE,
  payload,
});

export const loadUserByDaysRequest = payload => ({
  type: types.LOAD_USER_BY_DAYS_REQUEST,
  payload,
});
export const loadUserByDaysSuccess = payload => ({
  type: types.LOAD_USER_BY_DAYS_SUCCESS,
  payload,
});
export const loadUserByDaysFailure = payload => ({
  type: types.LOAD_USER_BY_DAYS_FAILURE,
  payload,
});
