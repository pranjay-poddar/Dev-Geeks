import produce from 'immer';
import * as types from './constants';

export const initialState = {
  isRequesting: false,
  success: false,
  errorMessage: '',
  contactDetail: {},
  errors: {},
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CONTACT_DETAIL_REQUEST:
        draft.isRequesting = true;
        break;
      case types.CONTACT_DETAIL_SUCCESS:
        draft.isRequesting = false;
        draft.contactDetail = action.payload.data;
        break;
      case types.SAVE_CONTACT_REQUEST:
        draft.isRequesting = true;
        draft.success = false;
        draft.errorMessage = '';
        break;
      case types.SAVE_CONTACT_SUCCESS:
        draft.isRequesting = false;
        draft.success = true;
        break;
      case types.SAVE_CONTACT_FAILURE:
        draft.isRequesting = false;
        draft.success = false;
        if (action.payload.errors) {
          draft.errors = action.payload.errors;
        }
        draft.errorMessage =
          typeof action.payload.errors === 'string'
            ? action.payload.errors
            : 'something went wrong';
        break;
    }
  });

export default reducer;
