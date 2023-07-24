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
import { makeSelectOne } from './selectors';
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
      `contents?find_is_page=false${query}`,
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
      `contents/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/admin/section-content'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'contents',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}
function* deleteContent(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `contents/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}
function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Content delete success!!',
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

function* addEditSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(actions.loadAllRequest());
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

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteContent);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
}
