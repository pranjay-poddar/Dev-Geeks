import {
  takeLatest,
  take,
  call,
  fork,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'redux-first-history';
import Api from '../../../utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne } from './selectors';
import { enqueueSnackbar } from '../../App/actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  let sort = '';

  if (action.payload) {
    Object.keys(action.payload).map((each) => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }

  if (action.payload.sort) {
    sort = `&sort=${action.payload.sort}`;
  }
  yield call(
    Api.get(
      `slider?${query}&${sort}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}
function* loadMedia(action) {
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
      `media?${query}`,
      actions.loadMediaSuccess,
      actions.loadMediaFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `slider/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess(goBack) {
  const action = yield take(types.ADD_EDIT_SUCCESS);

  const snackbarData = {
    message: action.payload.msg || 'Slider update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(push('/admin/slider-manage'));
}

function* addEdit({ payload }) {
  const successWatcher = yield fork(redirectOnSuccess, payload);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'slider',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}
function* deleteSlider(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `slider/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}
function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Slider delete success!!',
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

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.LOAD_MEDIA_REQUEST, loadMedia);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteSlider);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
}
