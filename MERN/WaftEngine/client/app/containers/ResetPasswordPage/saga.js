import {
  takeLatest,
  call,
  select,
  put,
  take,
  cancel,
  fork,
} from 'redux-saga/effects';
import Api from '../../utils/Api';
import { push, LOCATION_CHANGE } from 'redux-first-history';
import { makeSelectDefaultData } from './selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar, setToken, setUser } from '../App/actions';

function confirmPassword(data) {
  const errors = {};
  if (!data.code) errors.code = 'This field is required!!';
  if (!data.password) errors.password = 'This field is required!!';
  if (data.password != data.confirm_password)
    errors.confirm_password = 'password does not match';
  return { errors, verified: !Object.keys(errors).length };
}

function* redirectOnSuccess() {
  const { payload } = yield take(types.LOAD_RESET_SUCCESS);
  const { token, data } = payload;
  yield put(setUser(data));
  yield put(setToken(token));
  yield put(push('/'));
}

function* resetAction(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  let data = yield select(makeSelectDefaultData());
  data = { ...data };
  const verified = confirmPassword(data);
  if (verified.verified) {
    yield fork(
      Api.post(
        `user/resetpassword`,
        actions.loadResetSuccess,
        actions.loadResetFailure,
        data,
        null,
      ),
    );
    yield take([LOCATION_CHANGE, types.LOAD_RESET_FAILURE]);
    yield cancel(successWatcher);
  } else {
    yield put(actions.setErrors(verified.errors));
  }
}

function* resetSuccessFunc(action) {
  yield put(
    enqueueSnackbar({
      message: action.payload.msg || 'reset password success!!',
      options: {
        variant: 'success',
      },
    }),
  );
}

function* resetFailureFunc(action) {
  yield put(
    enqueueSnackbar({
      message: action.payload.msg || 'reset password failure!!',
      options: {
        variant: 'warning',
      },
    }),
  );
}

// Individual exports for testing
export default function* resetPasswordPageSaga() {
  yield takeLatest(types.LOAD_RESET_REQUEST, resetAction);
  yield takeLatest(types.LOAD_RESET_SUCCESS, resetSuccessFunc);
  yield takeLatest(types.LOAD_RESET_FAILURE, resetFailureFunc);
}
