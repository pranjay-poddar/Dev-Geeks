import { takeLatest, call, select } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadFAQ(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(`faq/all`, actions.loadFAQSuccess, actions.loadFAQFailure, token),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_FAQ_REQUEST, loadFAQ);
}
