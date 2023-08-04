import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminModuleManage state domain
 */

export const selectAdminModuleManageDomain = state =>
  state.adminModuleManage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectAdminModuleManageDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectAdminModuleManageDomain,
    substate => substate.one,
  );

export const makeSelectAccess = () =>
  createSelector(
    selectAdminModuleManageDomain,
    substate => substate.access,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAdminModuleManageDomain,
    substate => substate.loading,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAdminModuleManageDomain,
    substate => substate.query,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectAdminModuleManageDomain,
    state => state.errors,
  );

export const makeSelectSubModules = () =>
  createSelector(
    selectAdminModuleManageDomain,
    state => state.sub_module,
  );
/**
 * Default selector used by AdminModuleManage
 */

const makeSelectAdminModuleManage = () =>
  createSelector(
    selectAdminModuleManageDomain,
    substate => substate,
  );

export default makeSelectAdminModuleManage;
