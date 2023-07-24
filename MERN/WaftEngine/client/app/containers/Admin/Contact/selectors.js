import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminContactListPage state domain
 */

export const selectContactDomain = state =>
  state.adminContactListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Contact
 */
export const makeSelectAll = () =>
  createSelector(
    selectContactDomain,
    state => state.all,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectContactDomain,
    state => state.query,
  );
export const makeSelectOne = () =>
  createSelector(
    selectContactDomain,
    state => state.one,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectContactDomain,
    state => state.loading,
  );
