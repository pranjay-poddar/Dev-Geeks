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
import { makeSelectOne, makeSelectAccess } from './selectors';
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
      `role/module?${query}`,
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
      `role/module/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* loadAccess(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `role/access/module/${action.payload}`,
      actions.loadAccessSuccess,
      actions.loadAccessFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take([types.ADD_EDIT_SUCCESS, types.UPDATE_ACCESS_SUCCESS]);
  yield put(push('/admin/module-manage'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'role/module',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* updateAccess(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectAccess());
  yield fork(
    Api.post(
      `role/access/module/${action.payload}`,
      actions.updateAccessSuccess,
      actions.updateAccessFailure,
      { Access: data.Access },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.UPDATE_ACCESS_FAILURE]);
  yield cancel(successWatcher);
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
    message: action.payload.msg || 'Module update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* updateFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* updateSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Module update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadSubModule(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `role/module-group?size=100`,
      actions.loadSubModuleSuccess,
      actions.loadSubModuleFailure,
      token,
    ),
  );
}

export default function* adminRoleSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.LOAD_ACCESS_REQUEST, loadAccess);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.UPDATE_ACCESS_REQUEST, updateAccess);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.UPDATE_ACCESS_SUCCESS, updateSuccessFunc);
  yield takeLatest(types.UPDATE_ACCESS_FAILURE, updateFailureFunc);
  yield takeLatest(types.LOAD_SUB_MODULE_REQUEST, loadSubModule);
}
