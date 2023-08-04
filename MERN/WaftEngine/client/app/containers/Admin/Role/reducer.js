/*
 *
 * AdminRole reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
    msg: '',
  },
  one: {
    is_active: false,
    description: '',
    role_title: '',
  },
  query: { find_role_title: '' },
  loading: false,
  errors: { role_title: '', description: '' },
  module_data: [],
  role_data: { Access: [] },
  loaders: {
    module_loading: false,
    role_loading: false,
  },
  selectStates: {},
};

/* eslint-disable default-case, no-param-reassign */
const adminRoleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = '';
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = {
          ...draft.all,
          ...action.payload,
          totaldata: action.payload.totalData,
        };
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(e => e._id != action.payload.data._id),
        };
        break;

      case types.LOAD_MODULE_GROUP_REQUEST:
        draft.loaders.module_loading = true;
        break;
      case types.LOAD_MODULE_GROUP_SUCCESS:
        draft.loaders.module_loading = false;
        draft.module_data = action.payload.data;
        for (let index = 0; index < action.payload.data.length; index++) {
          const element = action.payload.data[index];
          draft.selectStates = {
            ...draft.selectStates,
            [element._id]: false,
          };
        }
        break;
      case types.LOAD_MODULE_GROUP_FAILURE:
        draft.loaders.module_loading = false;
        break;

      case types.LOAD_ROLE_ACCESS_REQUEST:
        draft.loaders.role_loading = true;
        break;
      case types.LOAD_ROLE_ACCESS_SUCCESS:
        draft.loaders.role_loading = false;
        draft.role_data = action.payload.data;

        break;
      case types.LOAD_ROLE_ACCESS_FAILURE:
        draft.loaders.role_loading = false;
        break;

      case types.SET_ACCESS_ARRAY:
        draft.role_data.Access[action.payload.index].access_type =
          action.payload.value;
        break;

      case types.SET_SELECT_STATE:
        draft.selectStates[action.payload.key] = action.payload.value;
        break;
    }
  });

export default adminRoleReducer;
