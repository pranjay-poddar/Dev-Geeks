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
import { enqueueSnackbar } from '../../App/actions';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne } from './selectors';

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
      `user?${query}`,
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
      `user/detail/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* loadAllRoles() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `role/role?is_active=true`,
      actions.loadAllRolesSuccess,
      actions.loadAllRolesFailure,
      token,
    ),
  );
}

function* redirectOnSuccess(goBack) {
  const action = yield take(types.ADD_EDIT_SUCCESS);
  const defaultMsg = {
    message: (action.payload && action.payload.msg) || 'save success',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
  yield put(push('/admin/user-manage'));
}

function* redirectOnPwReset() {
  yield take(types.UPDATE_PASSWORD_SUCCESS);
  yield put(push('/admin/user-manage'));
}

function* addEdit({ payload }) {
  const successWatcher = yield fork(redirectOnSuccess, payload);
  const token = yield select(makeSelectToken());
  const { users } = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'user/change',
      actions.addEditSuccess,
      actions.addEditFailure,
      users,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* updatePassword() {
  const successWatcher = yield fork(redirectOnPwReset);
  const token = yield select(makeSelectToken());
  const { users } = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'user/changepw',
      actions.updatePasswordSuccess,
      actions.updatePasswordFailure,
      users,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.UPDATE_PASSWORD_FAILURE]);
  yield cancel(successWatcher);
}

function* addEditFail(action) {
  const defaultError = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}

function* updateFail(action) {
  const defaultError = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}

function* updateSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'password update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* adminUserManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ALL_ROLES_REQUEST, loadAllRoles);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.UPDATE_PASSWORD_REQUEST, updatePassword);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFail);
  yield takeLatest(types.UPDATE_PASSWORD_FAILURE, updateFail);
  yield takeLatest(types.UPDATE_PASSWORD_SUCCESS, updateSuccessFunc);
}
