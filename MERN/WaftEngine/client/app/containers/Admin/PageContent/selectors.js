import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the PagecontentListing state domain
 */

export const selectPageContentListingDomain = (state) =>
  state.PagecontentListing || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(selectPageContentListingDomain, (substate) => substate.all);

export const makeSelectOne = () =>
  createSelector(selectPageContentListingDomain, (substate) => substate.one);

export const makeSelectQuery = () =>
  createSelector(selectPageContentListingDomain, (substate) => substate.query);

export const makeSelectLoading = () =>
  createSelector(
    selectPageContentListingDomain,
    (substate) => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(selectPageContentListingDomain, (state) => state.errors);

export const makeSelectMetaTag = () =>
  createSelector(selectPageContentListingDomain, (state) => state.tempMetaTag);

/**
 * Default selector used by ContentsListingPage
 */

const makeSelectContentsListingPage = () =>
  createSelector(selectPageContentListingDomain, (substate) => substate);

export default makeSelectContentsListingPage;
