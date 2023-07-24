import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the menuManage state domain
 */

export const selectDomain = state => state.menuManage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectShowSubMenu = () =>
  createSelector(selectDomain, state => state.show_sub_menu);

export const makeSelectAll = () =>
  createSelector(selectDomain, substate => substate.all);

export const makeSelectOne = () =>
  createSelector(selectDomain, substate => substate.one);

export const makeSelectQuery = () =>
  createSelector(selectDomain, substate => substate.query);

export const makeSelectCategory = () =>
  createSelector(selectDomain, substate => substate.sub_menu);

export const makeSelectLoading = () =>
  createSelector(selectDomain, substate => substate.loading);

export const makeSelectErrors = () =>
  createSelector(selectDomain, state => state.errors);

export const makeSelectSubMenu = () =>
  createSelector(selectDomain, state => state.sub_menu_form);

export const makeSelectLoadChild = () =>
  createSelector(selectDomain, state => state.loadChild);

/**
 * Default selector used by MenuManage
 */

const makeSelectMenuManage = () =>
  createSelector(selectDomain, substate => substate);

export default makeSelectMenuManage;
