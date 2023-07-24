import {
  call,
  takeEvery,
  takeLatest,
  select,
  put,
  takeLeading,
  delay,
} from 'redux-saga/effects';
import Api from '../../utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectToken } from './selectors';
import { push } from 'redux-first-history';

function* loadContent(action) {
  yield call(
    Api.get(
      `contents/key/${action.payload}`,
      actions.loadContentSuccess,
      actions.loadContentFailure,
    ),
  );
}

function* loadMedia(action) {
  yield call(
    Api.get(
      `media/${action.payload}`,
      actions.loadMediaSuccess,
      actions.loadMediaFailure,
    ),
  );
}
function* loadSlide(action) {
  yield call(
    Api.get(
      `slider/key/${action.payload}`,
      actions.loadSlideSuccess,
      actions.loadSlideFailure,
    ),
  );
}
function* logOut() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(`user/logout`, actions.logoutSuccess, actions.logoutFailure, token),
  );
}

function* logOutSuccessFunc() {
  yield put(push('/login'));
}

function* loadLatestBlog(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    query = `${query}&size=${action.payload.value}`;
  }
  yield call(
    Api.get(
      `blog/latest/${action.payload.key}?${query}`,
      actions.loadLatestBlogsSuccess,
      actions.loadLatestBlogsFailure,
      token,
    ),
  );
}

function* sessionExpired() {
  // token expired case, logout user and show alert that relogin is required
  // yield put(actions.logoutSuccess());

  const snackbarData = {
    message: 'User Session expired. please login again',
    options: {
      variant: 'warning',
    },
  };
  yield put(actions.enqueueSnackbar(snackbarData));
  yield delay(2000);
}

function* networkError() {
  // token expired case, logout user and show alert that relogin is required

  const snackbarData = {
    message: 'Something went wrong. Please check your network!',
    options: {
      variant: 'warning',
    },
  };
  yield put(actions.enqueueSnackbar(snackbarData));
  yield delay(2000);
}

function* loadMenu(action) {
  yield call(
    Api.get(
      `menu/detailforuser/${action.payload}`,
      actions.loadMenuSuccess,
      actions.loadMenuFailure,
    ),
  );
}

function* loadFaq(action) {
  yield call(
    Api.get(
      `faq/key/${action.payload}`,
      actions.loadFaqSuccess,
      actions.loadFaqFailure,
    ),
  );
}

export default function* defaultSaga() {
  yield takeEvery(types.LOAD_MENU_REQUEST, loadMenu);
  yield takeEvery(types.LOAD_CONTENT_REQUEST, loadContent);
  yield takeEvery(types.LOAD_MEDIA_REQUEST, loadMedia);
  yield takeEvery(types.LOAD_SLIDE_REQUEST, loadSlide);
  yield takeEvery(types.LOAD_LATEST_BLOGS_REQUEST, loadLatestBlog);
  yield takeLatest(types.LOGOUT_REQUEST, logOut);
  yield takeLatest(types.LOGOUT_SUCCESS, logOutSuccessFunc);

  yield takeLeading(types.SESSION_EXPIRED, sessionExpired);
  yield takeLeading(types.NETWORK_ERROR, networkError);
  yield takeEvery(types.LOAD_FAQ_REQUEST, loadFaq);
}
