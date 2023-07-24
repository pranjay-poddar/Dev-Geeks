import {
  takeLatest,
  take,
  fork,
  select,
  put,
  cancel,
} from 'redux-saga/effects';
import Api from '../../utils/Api';
import { push, LOCATION_CHANGE } from 'redux-first-history';
import { makeSelectToken } from '../App/selectors';
import { enqueueSnackbar, setToken, setUser } from '../App/actions';
import * as types from './constants';
import * as actions from './actions';

function* redirectOnSuccess() {
  const { payload } = yield take(types.LOAD_VERIFY_EMAIL_SUCCESS);
  const { token, data } = payload;
  yield put(setUser(data));
  yield put(setToken(token));
  yield put(push('/'));
}

function* verifyEmail(action) {
  const token = yield select(makeSelectToken());
  const successWatcher = yield fork(redirectOnSuccess);
  const data = { email: action.payload.email, code: action.payload.code };
  yield fork(
    Api.post(
      `user/verifymail`,
      actions.loadVerifyEmailSuccess,
      actions.loadVerifyEmailFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOAD_VERIFY_EMAIL_FAILURE]);
  yield cancel(successWatcher);
}
function* verifyEmailFailFunc(action) {
  const snackbarData = {
    message:
      (action.payload && action.payload.msg) ||
      'Something went wrong while verifying!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* resendMail(action) {
  const token = yield select(makeSelectToken());
  const data = { email: action.payload.email };
  yield fork(
    Api.post(
      `user/verifymail/resend`,
      actions.resendMailSuccess,
      actions.resendMailFailure,
      data,
      token,
    ),
  );
}

function* resendMailSuccess(action) {
  const snackbarData = {
    message:
      (action.payload && action.payload.msg) || 'Something went wrong !!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* resendMailFail(action) {
  const snackbarData = {
    message:
      (action.payload && action.payload.msg) || 'Something went wrong !!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* verifyEmailSaga() {
  yield takeLatest(types.LOAD_VERIFY_EMAIL_REQUEST, verifyEmail);
  yield takeLatest(types.LOAD_VERIFY_EMAIL_FAILURE, verifyEmailFailFunc);

  yield takeLatest(types.RESEND_MAIL_REQUEST, resendMail);
  yield takeLatest(types.RESEND_MAIL_SUCCESS, resendMailSuccess);
  yield takeLatest(types.RESEND_MAIL_FAILURE, resendMailFail);
}
