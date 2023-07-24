import {
  takeLatest,
  take,
  call,
  fork,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'redux-first-history';
import Api from '../../../utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne, makeSelectRoleData } from './selectors';
import { enqueueSnackbar } from '../../App/actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map((each) => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `role/role?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `role/role/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* deleteOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `role/role/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/admin/role-manage'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'role/role',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Role delete success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addEditFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addEditSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update Success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadModuleGroup(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `role/module-hierarchy`,
      actions.loadModuleGroupSuccess,
      actions.loadModuleGroupFailure,
      token,
    ),
  );
}

function* loadRoleAccess(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `role/access/role/${action.payload}`,
      actions.loadRoleAccessSuccess,
      actions.loadRoleAccessFailure,
      token,
    ),
  );
}

function* saveRoleAccess(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectRoleData());
  yield fork(
    Api.post(
      `role/access/role/${action.payload}`,
      actions.saveRoleAccessSuccess,
      actions.saveRoleAccessFailure,
      data,
      token,
    ),
  );
}

function* saveRoleAccessFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* saveRoleAccessSuccessFunc(action) {
  yield put(push('/admin/role-manage'));

  const snackbarData = {
    message: action.payload.msg || 'Update Success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* adminRoleSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);

  yield takeLatest(types.LOAD_MODULE_GROUP_REQUEST, loadModuleGroup);
  yield takeLatest(types.LOAD_ROLE_ACCESS_REQUEST, loadRoleAccess);
  yield takeLatest(types.SAVE_ROLE_ACCESS_REQUEST, saveRoleAccess);
  yield takeLatest(types.SAVE_ROLE_ACCESS_SUCCESS, saveRoleAccessSuccessFunc);
  yield takeLatest(types.SAVE_ROLE_ACCESS_FAILURE, saveRoleAccessFailureFunc);
}
