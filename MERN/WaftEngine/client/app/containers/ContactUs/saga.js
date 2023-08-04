import { takeLatest, put, select, call } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../App/actions';

function* saveContact(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      'contact',
      actions.saveContactSuccess,
      actions.saveContactFailure,
      action.payload,
      token,
    ),
  );
}
function* loadContactDetail() {
  yield call(
    Api.get(
      `contents/key/contactdetail`,
      actions.contactDetailSuccess,
      actions.contactDetailFailure,
    ),
  );
}

function* saveSuccessfunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Contact Save success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* saveFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* defaultSaga() {
  yield takeLatest(types.SAVE_CONTACT_REQUEST, saveContact);
  yield takeLatest(types.CONTACT_DETAIL_REQUEST, loadContactDetail);
  yield takeLatest(types.SAVE_CONTACT_SUCCESS, saveSuccessfunc);
  yield takeLatest(types.SAVE_CONTACT_FAILURE, saveFailureFunc);
}
