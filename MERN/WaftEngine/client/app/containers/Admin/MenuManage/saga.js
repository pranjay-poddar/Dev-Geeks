import { takeLatest, call, select, put, fork } from 'redux-saga/effects';
import Api from '../../../utils/Api';
import { push } from 'redux-first-history';
import { makeSelectToken } from '../../App/selectors';
import { makeSelectOne, makeSelectSubMenu } from './selectors';
import * as types from './constants';
import * as actions from './actions';
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
      `menu?${query}`,
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
      `menu/detail/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

// to load individual menu data
function* loadMenu(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `menu/menuitem/${action.payload}`,
      actions.loadMenuSuccess,
      actions.loadMenuFailure,
      token,
    ),
  );
}

// add parent menu
function* addEdit(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield call(
    Api.post(
      `menu`,
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
}

function* addEditSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(push('/admin/menu-manage'));
}

// add parent menu also with the ability to add child_menu
function* addEdit2(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield call(
    Api.post(
      `menu`,
      actions.addEditSuccess2,
      actions.addEditFailure2,
      data,
      token,
    ),
  );
}

function* addEdit2FailureFunc(action) {
  const defaultError = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}

// add child menu
function* addEditChild(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectSubMenu());
  if (data.parent_menu === '') {
    const { parent_menu, ...restData } = data;
    yield call(
      Api.post(
        `menu/menuitem`,
        actions.addEditChildSuccess,
        actions.addEditChildFailure,
        restData,
        token,
      ),
    );
  } else {
    yield call(
      Api.post(
        `menu/menuitem`,
        actions.addEditChildSuccess,
        actions.addEditChildFailure,
        data,
        token,
      ),
    );
  }
}

function* addEditChildSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(actions.clearSubMenu());
}

function* addEditChildFailureFunc(action) {
  const snackbarData = {
    message: action.payload.errors.parent_menu || 'Update success!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `menu/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* deleteOneSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteOneFailureFunc(action) {
  const defaultError = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}

function* deleteMenuItem(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `menu/menuitem/${action.payload}`,
      actions.deleteMenuItemSuccess,
      actions.deleteMenuItemFailure,
      token,
    ),
  );
}

function* deleteMenuItemSuccessFunc(action) {
  const one = yield select(makeSelectOne());

  yield put(actions.loadOneRequest(one._id));

  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteMenuItemFailureFunc(action) {
  const defaultError = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}

// Individual exports for testing
export default function* menuManageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.LOAD_MENU_REQUEST, loadMenu);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.ADD_EDIT_CHILD_REQUEST, addEditChild);
  yield takeLatest(types.ADD_EDIT_CHILD_SUCCESS, addEditChildSuccessFunc);
  yield takeLatest(types.ADD_EDIT_CHILD_FAILURE, addEditChildFailureFunc);
  yield takeLatest(types.ADD_EDIT_REQUEST_2, addEdit2);
  yield takeLatest(types.ADD_EDIT_FAILURE_2, addEdit2FailureFunc);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteOneSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteOneFailureFunc);

  yield takeLatest(types.DELETE_MENU_ITEM_REQUEST, deleteMenuItem);
  yield takeLatest(types.DELETE_MENU_ITEM_SUCCESS, deleteMenuItemSuccessFunc);
  yield takeLatest(types.DELETE_MENU_ITEM_FAILURE, deleteMenuItemFailureFunc);
}
