/*
 *
 * ResetPasswordPage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  defaultData: {
    code: '',
    password: '',
    confirm_password: '',
    email: '',
  },
  loading: false,
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const resetPasswordPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_RESET_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_RESET_SUCCESS:
        draft.loading = false;
        break;
      case types.LOAD_RESET_FAILURE:
        draft.loading = false;
        break;
      case types.SET_DATA:
        draft.defaultData[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = '';
        break;
      case types.SET_ERRORS:
        draft.errors = action.payload;
        draft.loading = false;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
    }
  });

export default resetPasswordPageReducer;
