import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const reduxKey = 'faq';

const selectDomain = (state) => state[reduxKey] || initialState;

export const makeSelectFAQ = () =>
  createSelector(selectDomain, (state) => state.faq);
export const makeSelectLoading = () =>
  createSelector(selectDomain, (state) => state.loading);
