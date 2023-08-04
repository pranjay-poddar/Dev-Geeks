import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const reduxKey = 'resetPasswordPage';
/**
 * Direct selector to the resetPasswordPage state domain
 */

export const selectDomain = (state) => state[reduxKey] || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(selectDomain, (state) => state.defaultData);

export const makeSelectLoading = () =>
  createSelector(selectDomain, (state) => state.loading);

export const makeSelectErrors = () =>
  createSelector(selectDomain, (state) => state.errors);
