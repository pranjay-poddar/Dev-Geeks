import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the BlogCategory state domain
 */

const selectBlogCategoryDomain = state => state.BlogCategory || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlogCategory
 */

export const makeSelectAll = () =>
  createSelector(selectBlogCategoryDomain, substate => substate.all);

export const makeSelectCount = () =>
  createSelector(selectBlogCategoryDomain, substate => substate.count);

export const makeSelectErrors = () =>
  createSelector(selectBlogCategoryDomain, state => state.errors);
export const makeSelectQuery = () =>
  createSelector(selectBlogCategoryDomain, substate => substate.query);
export const makeSelectOne = () =>
  createSelector(selectBlogCategoryDomain, substate => substate.one);
export const makeSelectLoading = () =>
  createSelector(selectBlogCategoryDomain, state => state.loading);
