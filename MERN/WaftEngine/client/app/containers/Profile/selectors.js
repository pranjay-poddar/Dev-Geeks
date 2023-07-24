import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectUserPersonalInformationPageDomain = state =>
  state.userPersonalInformationPage || initialState;

export const makeSelectOne = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.one,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.errors,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.loading,
  );

export const makeSelectLoadingObj = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.loadingObj,
  );

export const makeSelectTwoFactor = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.twoFactor,
  );

export const makeSelectHelperObj = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.helperObj,
  );

export const makeSelectCode = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.verification_code,
  );

export const makeSelectToken = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.token,
  );

const makeSelectUserPersonalInformationPage = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate,
  );

export default makeSelectUserPersonalInformationPage;
