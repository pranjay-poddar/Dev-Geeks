import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from '../../../utils/Api';
import * as types from './constants';
import { makeSelectToken } from '../../App/selectors';
import * as actions from './actions';
import { enqueueSnackbar } from '../../App/actions';

function* loadSubscriber(action) {
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
      `subscribe?${query}`,
      actions.loadSubscriberSuccess,
      actions.loadSubscriberFailure,
      token,
    ),
  );
}
function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `subscribe/${action.payload}`,
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
      `subscribe/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}
function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Subscriber delete success!!',
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
// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(types.LOAD_SUBSCRIBER_REQUEST, loadSubscriber);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
}
