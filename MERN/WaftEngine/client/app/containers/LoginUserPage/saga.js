import {
  takeLatest,
  select,
  put,
  fork,
  take,
  cancel,
  call,
} from 'redux-saga/effects';
import Api from '../../utils/Api';
import { LOCATION_CHANGE, push } from 'redux-first-history';
import * as types from './constants';
import * as actions from './actions';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectTwoFactor,
} from './selectors';
import { setUser, setToken, enqueueSnackbar } from '../App/actions';

// Individual exports for testing
export const validate = (data) => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  if (!data.password) errors.password = 'password is required';
  return { errors, isValid: !Object.keys(errors).length };
};

export function* redirectOnSuccess(redirect) {
  const { payload } = yield take([
    types.LOGIN_SUCCESS,
    types.LOGIN_WITH_FB_SUCCESS,
    types.LOGIN_WITH_GOOGLE_SUCCESS,
  ]);
  const { token, data } = payload;
  yield put(setUser(data));
  yield put(setToken(token));
  if (redirect) {
    yield put(push(redirect));
  } else {
    yield put(push('/'));
  }
}

export function* loginAction(action) {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const data = { email, password };
  const errors = validate(data);
  if (errors.isValid) {
    yield fork(
      Api.post('user/login', actions.loginSuccess, actions.loginFailure, data),
    );
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: errors.errors }));
    yield put(actions.setStoreValue({ key: 'loading', value: false }));
  }
}

export function* loginFbAction(action) {
  const body = { access_token: action.payload.accessToken };
  const successWatcher = yield fork(redirectOnSuccess, action.redirect);

  yield fork(
    Api.post(
      `user/login/facebook`,
      actions.loginWithFbSuccess,
      actions.loginWithFbFailure,
      body,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOGIN_WITH_FB_FAILURE]);
  yield cancel(successWatcher);
}

export function* loginGoogleAction(action) {
  const body = { access_token: action.payload.accessToken };
  const successWatcher = yield fork(redirectOnSuccess, action.redirect);

  yield fork(
    Api.post(
      `user/login/google`,
      actions.loginWithGoogleSuccess,
      actions.loginWithGoogleFailure,
      body,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOGIN_WITH_GOOGLE_FAILURE]);
  yield cancel(successWatcher);
}

function* loginFailureFunc(action) {
  if (
    action.payload &&
    action.payload.data &&
    action.payload.data.email_verified === false
  ) {
    yield put(push(`/verify/${action.payload.data.email}`));
  }
  const snackbarData = {
    message: action.payload.msg || 'Error while login!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loginSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'login success!!',
    options: {
      variant: 'success',
    },
  };
  if (
    !(
      action.payload.data &&
      action.payload.data.multi_fa &&
      (action.payload.data.multi_fa.google_authenticate.is_authenticate ||
        action.payload.data.multi_fa.email.is_authenticate)
    )
  ) {
    const { token, data } = action.payload;
    yield put(setUser(data));
    yield put(setToken(token));
    yield put(push('/'));
  }
  yield put(enqueueSnackbar(snackbarData));
}

function* addTwoFactor(action) {
  const data = yield select(makeSelectTwoFactor());
  yield fork(
    Api.post(
      `user/login/mfa`,
      actions.addTwoFactorSuccess,
      actions.addTwoFactorFailure,
      data,
    ),
  );
}

function* addTwoFactorSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'login success!!',
    options: {
      variant: 'success',
    },
  };
  const { token, data } = action.payload;
  yield put(setUser(data));
  yield put(setToken(token));
  yield put(push('/'));
  yield put(enqueueSnackbar(snackbarData));
}

export default function* loginAdminPageSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginAction);
  yield takeLatest(types.LOGIN_FAILURE, loginFailureFunc);
  yield takeLatest(types.LOGIN_SUCCESS, loginSuccessFunc);
  yield takeLatest(types.LOGIN_WITH_FB_REQUEST, loginFbAction);
  yield takeLatest(types.LOGIN_WITH_GOOGLE_REQUEST, loginGoogleAction);
  yield takeLatest(types.ADD_TWO_FACTOR_REQUEST, addTwoFactor);
  yield takeLatest(types.ADD_TWO_FACTOR_SUCCESS, addTwoFactorSuccessFunc);
}
