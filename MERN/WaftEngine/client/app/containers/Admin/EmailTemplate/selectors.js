import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminTemplateListingPage state domain
 */

export const selectTemplateDomain = state =>
  state.adminTemplateListingPage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectTemplateDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectTemplateDomain,
    substate => substate.one,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectTemplateDomain,
    substate => substate.loading,
  );

/**
 * Default selector used by Template
 */

const makeSelectTemplate = () =>
  createSelector(
    selectTemplateDomain,
    substate => substate,
  );

export default makeSelectTemplate;
