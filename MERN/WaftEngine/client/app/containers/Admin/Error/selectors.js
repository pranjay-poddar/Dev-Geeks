import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminErrorManagePage state domain
 */

export const selectErrorDomain = state =>
  state.adminErrorManagePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Error
 */

export const makeSelectAll = () =>
  createSelector(
    selectErrorDomain,
    substate => substate.all,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectErrorDomain,
    state => state.query,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectErrorDomain,
    state => state.loading,
  );
