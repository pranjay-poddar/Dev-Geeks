import {
  take,
  takeLatest,
  call,
  put,
  select,
  fork,
  cancel,
} from 'redux-saga/effects';
import Api from '../../../utils/Api';
import { LOCATION_CHANGE, push } from 'redux-first-history';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne } from './selectors';
import { makeSelectToken } from '../../App/selectors';
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
      `blog/category?${query}`,
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
      `blog/category/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}
function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/admin/blog-cat-manage'));
}

export const validate = (data) => {
  const errors = {};
  if (!data.title) errors.title = 'Title field is required!!';
  if (!data.slug_url) errors.slug_url = 'Slug field is required!!';
  return { errors, isValid: !Object.keys(errors).length };
};

function* addEdit() {
  const sucessWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  const errors = validate(data);
  let main_data = { ...data };
  if (data.image && data.image._id) {
    main_data = { ...main_data, image: data.image._id };
  }
  if (errors.isValid) {
    yield fork(
      Api.post(
        'blog/category',
        actions.addEditSuccess,
        actions.addEditFailure,
        main_data,
        token,
      ),
    );
    yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
    yield cancel(sucessWatcher);
  } else {
    yield put(actions.setErrorValue(errors.errors));
  }
}

function* addEditSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Save success!!',
    options: {
      variant: 'success',
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

function* deleteCat(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `blog/category/${action.payload}`,
      actions.deleteCatSuccess,
      actions.deleteCatFailure,
      token,
    ),
  );
}
function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Blog Category delete success!!',
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

function* setErrorFunc() {
  const snackbarData = {
    message: 'Please fill all required fields!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* getCount(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/count/category/${action.payload}`,
      actions.getCountSuccess,
      actions.getCountFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_CAT_REQUEST, deleteCat);
  yield takeLatest(types.DELETE_CAT_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_CAT_FAILURE, deleteFailureFunc);
  yield takeLatest(types.SET_ERROR_VALUE, setErrorFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.GET_COUNT_REQUEST, getCount);
}
