import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.contactUs || initialState;

export const makeSelectIsRequesting = () =>
  createSelector(selectDomain, state => state.isRequesting);

export const makeSelectSuccess = () =>
  createSelector(selectDomain, state => state.success);
export const makeSelectErrorMsg = () =>
  createSelector(selectDomain, state => state.errorMessage);

export const makeSelectError = () =>
  createSelector(selectDomain, state => state.errors);

export const makeSelectContactDetail = () =>
  createSelector(selectDomain, state => state.contactDetail);
