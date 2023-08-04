import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the globalSetting state domain
 */

export const selectDomain = state => state.globalSetting || initialState;

/**
 * Other specific selectors
 */

export const makeSelectWithdraw = () =>
  createSelector(selectDomain, state => state.withdraw);

export const makeSelectLoading = () =>
  createSelector(selectDomain, state => state.loading);

export const makeSelectOne = () =>
  createSelector(selectDomain, state => state.one);

export const makeSelectQuery = () =>
  createSelector(selectDomain, state => state.query);

export const makeSelectTypes = () =>
  createSelector(selectDomain, state => state.types);

export const makeSelectSubTypes = () =>
  createSelector(selectDomain, state => state.sub_types);

/**
 * Default selector used by GlobalSetting
 */

const makeSelectGlobalSetting = () =>
  createSelector(selectDomain, substate => substate);

export default makeSelectGlobalSetting;
