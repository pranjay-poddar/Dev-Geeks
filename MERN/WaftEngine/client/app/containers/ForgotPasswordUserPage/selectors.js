import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const reduxKey = 'forgotPasswordUserPage';
/**
 * Direct selector to the forgotPasswordUserPage state domain
 */

export const selectForgotPasswordUserPageDomain = (state) =>
  state[reduxKey] || initialState;

/**
 * Other specific selectors
 */
export const makeSelectLoading = () =>
  createSelector(selectForgotPasswordUserPageDomain, (state) => state.loading);
export const makeSelectEmail = () =>
  createSelector(selectForgotPasswordUserPageDomain, (state) => state.email);
export const makeSelectErrors = () =>
  createSelector(selectForgotPasswordUserPageDomain, (state) => state.errors);
export const makeSelectEmailError = () =>
  createSelector(makeSelectErrors(), (state) => state.email);

/**
 * Default selector used by ForgotPasswordUserPage
 */

const makeSelectForgotPasswordUserPage = () =>
  createSelector(selectForgotPasswordUserPageDomain, (substate) => substate);

export default makeSelectForgotPasswordUserPage;
