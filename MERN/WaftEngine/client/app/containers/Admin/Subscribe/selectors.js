import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminSubscribePage state domain
 */

export const selectSubscribeDomain = state =>
  state.adminSubscribePage || initialState;

export const makeSelectAll = () =>
  createSelector(
    selectSubscribeDomain,
    state => state.all,
  );
export const makeSelectOne = () =>
  createSelector(
    selectSubscribeDomain,
    state => state.one,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectSubscribeDomain,
    state => state.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectSubscribeDomain,
    state => state.loading,
  );
