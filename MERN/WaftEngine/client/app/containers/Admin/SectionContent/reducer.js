/*
 *
 * AdsListingPage reducer
 *
 */

import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totalData: 0,
  },
  one: {
    name: '',
    key: '',
    description: '',
    publish_from: '',
    is_active: false,
    is_page: false,
    publish_to: '',
  },
  query: { find_name: '', find_key: '', size: 10 },
  loading: false,
  errors: { name: '', key: '', description: '' },
  tempMetaTag: '',
  showForm: false,
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = ' ';
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.ADD_EDIT_SUCCESS:
        draft.showForm = false;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        draft.tempMetaTag = '';
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = { ...initialState.one, ...action.payload.data };
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            (each) => each._id != action.payload.data._id,
          ),
        };
        break;
      case types.SET_META_TAG_VALUE:
        draft.tempMetaTag = action.payload;
        break;

      case types.SET_SHOW_FORM:
        draft.showForm = action.payload;
        break;
    }
  });

export default reducer;
