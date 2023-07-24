import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signupUserPage state domain
 */

export const selectSignupUserPageDomain = state =>
  state.signupUserPage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectLoading = () =>
  createSelector(
    selectSignupUserPageDomain,
    state => state.loading,
  );
export const makeSelectEmail = () =>
  createSelector(
    selectSignupUserPageDomain,
    state => state.email,
  );
export const makeSelectPassword = () =>
  createSelector(
    selectSignupUserPageDomain,
    state => state.password,
  );
export const makeSelectName = () =>
  createSelector(
    selectSignupUserPageDomain,
    state => state.name,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectSignupUserPageDomain,
    state => state.errors,
  );
export const makeSelectEmailError = () =>
  createSelector(
    makeSelectErrors(),
    state => state.email,
  );
export const makeSelectNameError = () =>
  createSelector(
    makeSelectErrors(),
    state => state.name,
  );
export const makeSelectGenderError = () =>
  createSelector(
    makeSelectErrors(),
    state => state.gender,
  );
export const makeSelectPasswordError = () =>
  createSelector(
    makeSelectErrors(),
    state => state.password,
  );

/**
 * Default selector used by SignupUserPage
 */

const makeSelectSignupUserPage = () =>
  createSelector(
    selectSignupUserPageDomain,
    substate => substate,
  );

export default makeSelectSignupUserPage;
