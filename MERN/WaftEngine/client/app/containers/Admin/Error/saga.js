import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from '../../../utils/Api';
import { makeSelectToken } from '../../App/selectors';
import { enqueueSnackbar } from '../../App/actions';
import * as types from './constants';
import * as actions from './actions';

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
      `bug?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* deleteError(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `bug/${action.payload}`,
      actions.errorDeleteSuccess,
      actions.errorDeleteFailure,
      token,
    ),
  );
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg,
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteFailureFunc(action) {
  const snackbarData = {
    message: 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}
function* deleteAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `bug/all`,
      actions.deleteAllSuccess,
      actions.deleteAllFailure,
      token,
    ),
  );
}

function* deleteAllSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg,
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteAllFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.ERROR_DELETE_REQUEST, deleteError);
  yield takeLatest(types.ERROR_DELETE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.ERROR_DELETE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.DELETE_All_REQUEST, deleteAll);
  yield takeLatest(types.DELETE_All_SUCCESS, deleteAllSuccessFunc);
  yield takeLatest(types.DELETE_All_FAILURE, deleteAllFailureFunc);
}
