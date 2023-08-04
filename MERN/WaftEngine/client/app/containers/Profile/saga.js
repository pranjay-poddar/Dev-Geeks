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
import Api from '../../utils/Api';
import { makeSelectToken, makeSelectUser } from '../App/selectors';
import * as types from './constants';
import { enqueueSnackbar } from '../App/actions';
import * as actions from './actions';

import { makeSelectOne, makeSelectTwoFactor } from './selectors';

function* loadOne() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'user/profile',
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());

  yield fork(
    Api.multipartPost(
      'user/profile',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      { file: data.image },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* addEditSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'User Profile Updated',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* redirectOnSuccessChangePP() {
  yield take(types.CHANGE_PASSWORD_SUCCESS);
}

function* changePassword(action) {
  const successWatcher = yield fork(redirectOnSuccessChangePP);

  const token = yield select(makeSelectToken());
  yield fork(
    Api.post(
      'user/changepassword',
      actions.changePasswordSuccess,
      actions.changePasswordFailure,
      action.payload,
      token,
    ),
  );

  yield take([LOCATION_CHANGE, types.CHANGE_PASSWORD_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnVerifySuccess() {
  yield take(types.VERIFY_EMAIL_SUCCESS);
  yield put(push('/user/profile'));
}

function* verifyEmail(action) {
  const successWatcher = yield fork(redirectOnVerifySuccess);
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  yield fork(
    Api.post(
      `user/verifymail`,
      actions.verifyEmailSuccess,
      actions.verifyEmailFailure,
      { email: user.email, code: action.payload },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.VERIFY_EMAIL_FAILURE]);
  yield cancel(successWatcher);
}

function* verifyEmailFailFunc(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Something went wrong while verifying!!',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* verifyEmailSuccFunc(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Email verified successfully!!',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* changepwSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'password change success!!',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* resendCode() {
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  yield call(
    Api.post(
      `user/verifymail/resend`,
      actions.resendCodeSuccess,
      actions.resendCodeFailure,
      { email: user.email },
      token,
    ),
  );
}

function* resendCodeSuccFunc(action) {
  const defaultMsg = {
    message: action.payload.msg || 'code resent successfully!!',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* resendCodeFailFunc(action) {
  const defaultMsg = {
    message: action.payload.msg || 'code resent failure!!',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* loadTwoFactor() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'user/mfa',
      actions.loadTwoFactorSuccess,
      actions.loadTwoFactorFailure,
      token,
    ),
  );
}

// use this to send the google code update
function* setGoogleTwoFactor() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectTwoFactor());
  const { code } = data.google_authenticate;
  yield call(
    Api.post(
      'user/mfa/ga/verify',
      actions.setGoogleTwoFactorSuccess,
      actions.setGoogleTwoFactorFailure,
      { code },
      token,
    ),
  );
}

function* addEmailTwoFactor({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      'user/mfa/email',
      actions.addEmailTwoFactorSuccess,
      actions.addEmailTwoFactorFailure,
      payload,
      token,
    ),
  );
}

function* addGoogleTwoFactor({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      'user/mfa/ga',
      actions.addGoogleTwoFactorSuccess,
      actions.addGoogleTwoFactorFailure,
      payload,
      token,
    ),
  );
}

export default function* userPersonalInformationPageSaga() {
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.VERIFY_EMAIL_REQUEST, verifyEmail);
  yield takeLatest(types.VERIFY_EMAIL_FAILURE, verifyEmailFailFunc);
  yield takeLatest(types.VERIFY_EMAIL_SUCCESS, verifyEmailSuccFunc);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessful);
  yield takeLatest(types.CHANGE_PASSWORD_REQUEST, changePassword);
  yield takeLatest(types.CHANGE_PASSWORD_SUCCESS, changepwSuccessful);
  yield takeLatest(types.RESEND_CODE_REQUEST, resendCode);
  yield takeLatest(types.RESEND_CODE_SUCCESS, resendCodeSuccFunc);
  yield takeLatest(types.RESEND_CODE_FAILURE, resendCodeFailFunc);
  yield takeLatest(types.LOAD_TWO_FACTOR_REQUEST, loadTwoFactor);
  yield takeLatest(types.SET_GOOGLE_TWO_FACTOR_REQUEST, setGoogleTwoFactor);
  yield takeLatest(types.ADD_EMAIL_TWO_FACTOR_REQUEST, addEmailTwoFactor);
  yield takeLatest(types.ADD_GOOGLE_TWO_FACTOR_REQUEST, addGoogleTwoFactor);
}
