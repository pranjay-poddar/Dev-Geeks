import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const reduxKey = 'verifyEmail';

/**
 * Direct selector to the verifyEmail state domain
 */

export const selectDomain = (state) => state[reduxKey] || initialState;

/**
 * Other specific selectors
 */

export const makeSelectLoading = () =>
  createSelector(selectDomain, (state) => state.loading);
