/*
 *
 * VerifyEmail reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  one: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const verifyEmailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_VERIFY_EMAIL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_VERIFY_EMAIL_SUCCESS:
        draft.loading = false;
        draft.one = initialState.one;
        break;
      case types.LOAD_VERIFY_EMAIL_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default verifyEmailReducer;
