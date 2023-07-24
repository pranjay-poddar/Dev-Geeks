import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sliderManagePage state domain
 */

export const selectSliderPageDomain = state =>
  state.sliderManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectSliderPageDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectSliderPageDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectSliderPageDomain,
    substate => substate.query,
  );

export const makeSelectMedia = () =>
  createSelector(
    selectSliderPageDomain,
    substate => substate.media,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectSliderPageDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectSliderPageDomain,
    state => state.errors,
  );
