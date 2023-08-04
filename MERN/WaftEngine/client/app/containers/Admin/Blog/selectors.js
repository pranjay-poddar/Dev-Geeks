import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the BlogManagePage state domain
 */

const selectDomain = state => state.blogManagePage || initialState;

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    state => state.all,
  );
export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    state => state.one,
  );
export const makeSelectCategory = () =>
  createSelector(
    selectDomain,
    state => state.category,
  );

export const makeSelectHelper = () =>
  createSelector(
    selectDomain,
    state => state.helper,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    state => state.query,
  );
export const makeSelectChip = () =>
  createSelector(
    selectDomain,
    state => state.chipData,
  );
export const makeSelectTag = () =>
  createSelector(
    selectDomain,
    state => state.tempTag,
  );
export const makeSelectMetaTag = () =>
  createSelector(
    selectDomain,
    state => state.tempMetaTag,
  );
export const makeSelectMetaKeyword = () =>
  createSelector(
    selectDomain,
    state => state.tempMetaKeyword,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectDomain,
    state => state.errors,
  );

export const makeSelectUsers = () =>
  createSelector(
    selectDomain,
    state => state.users,
  );

export const makeSelectUpateCalled = () =>
  createSelector(
    selectDomain,
    state => state.updateCalled,
  );
