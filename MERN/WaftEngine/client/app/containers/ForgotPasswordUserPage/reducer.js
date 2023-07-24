/*
 *
 * ForgotPasswordUser reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  email: '',
  errors: {},
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const ForgotPasswordUserReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CLEAR_ERROR:
        draft.errors = initialState.errors;
        break;
      case types.SET_STORE_VALUE:
        draft[action.payload.key] = action.payload.value;
        break;
      case types.FORGOT_PASSWORD_FAILURE:
        draft.errors = { ...action.payload.errors };
        break;
      case types.CLEAR_STORE:
        draft = initialState;
        break;
    }
  });

export default ForgotPasswordUserReducer;
