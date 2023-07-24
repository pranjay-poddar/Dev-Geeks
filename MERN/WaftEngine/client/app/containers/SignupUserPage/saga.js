import {
  takeLatest,
  select,
  put,
  fork,
  take,
  cancel,
} from 'redux-saga/effects';
import Api from '../../utils/Api';
import { LOCATION_CHANGE, push } from 'redux-first-history';
import * as types from './constants';
import * as actions from './actions';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectName,
} from './selectors';
import { setUser, setToken, enqueueSnackbar } from '../App/actions';

// Individual exports for testing

export const validate = (data) => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  if (!data.password) errors.password = 'password is required';
  if (!data.name) errors.name = 'name is required';
  return { errors, isValid: !Object.keys(errors).length };
};

export function* redirectOnSuccess(redirect) {
  const { payload } = yield take([
    types.SIGNUP_SUCCESS,
    types.SIGNUP_WITH_FB_SUCCESS,
    types.SIGNUP_WITH_GOOGLE_SUCCESS,
  ]);
  const { token, data } = payload;
  yield put(setUser(data));
  yield put(setToken(token));
  if (redirect) {
    yield put(push(redirect));
  } else {
    // do something
    yield put(push(`/verify/${data.email}`));
  }
}

export function* signupAction(action) {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const name = yield select(makeSelectName());
  const data = { email, password, name };
  const errors = validate(data);
  if (errors.isValid) {
    const successWatcher = yield fork(redirectOnSuccess, action.redirect);
    yield fork(
      Api.post(
        'user/register',
        actions.signupSuccess,
        actions.signupFailure,
        data,
      ),
    );
    yield take([LOCATION_CHANGE, types.SIGNUP_FAILURE]);
    yield cancel(successWatcher);
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: errors.errors }));
    yield put(actions.setStoreValue({ key: 'loading', value: false }));
  }
}

export function* signupFbAction(action) {
  const body = { access_token: action.payload.accessToken };
  const successWatcher = yield fork(redirectOnSuccess, action.redirect);

  yield fork(
    Api.post(
      `user/login/facebook`,
      actions.signupWithFbSuccess,
      actions.signupWithFbFailure,
      body,
    ),
  );
  yield take([LOCATION_CHANGE, types.SIGNUP_WITH_FB_FAILURE]);
  yield cancel(successWatcher);
}

export function* signupGoogleAction(action) {
  const body = { access_token: action.payload.accessToken };
  const successWatcher = yield fork(redirectOnSuccess, action.redirect);

  yield fork(
    Api.post(
      `user/login/google`,
      actions.signupWithGoogleSuccess,
      actions.signupWithGoogleFailure,
      body,
    ),
  );
  yield take([LOCATION_CHANGE, types.SIGNUP_WITH_GOOGLE_FAILURE]);
  yield cancel(successWatcher);
}

function* signupFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Error while signing up!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* signupSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'signed up successfully!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* signupUserPageSaga() {
  yield takeLatest(types.SIGNUP_REQUEST, signupAction);
  yield takeLatest(types.SIGNUP_WITH_FB_REQUEST, signupFbAction);
  yield takeLatest(types.SIGNUP_WITH_GOOGLE_REQUEST, signupGoogleAction);
  yield takeLatest(types.SIGNUP_FAILURE, signupFailureFunc);
  yield takeLatest(types.SIGNUP_SUCCESS, signupSuccessFunc);
}
