/*
 *
 * Template reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: [],
  one: {
    variables: [],
    template_name: '',
    template_key: '',
    information: '',
    alternate_text: '',
    form: '',
    subject: '',
    body: '',
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminTemplateListingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload.data;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
    }
  });

export default adminTemplateListingPageReducer;
