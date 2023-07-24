/*
 *
 * User reducer
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
    users: {
      email: '',
      name: '',
      bio: '',
      password: '',
      email_verified: false,
      roles: [],
    },
    roles: [],
    rolesNormalized: {},
  },
  roles: [],
  query: { find_name: '' },
  loading: false,
  errors: { name: '', roles: '', password: '' },
};

/* eslint-disable default-case, no-param-reassign */
const adminUserManagePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const normalizedData = {};
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        Object.keys(action.payload.value).map((each) => {
          if (typeof draft.one.users[each] === 'string') {
            if (draft.one.users[each] !== '') {
              draft.errors[each] = '';
            }
          } else if (draft.one.users[each].length > 0) {
            draft.errors[each] = '';
          }
          return null;
        });
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_QUERY_OBJ:
        draft.query = action.payload;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.UPDATE_PASSWORD_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
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
      case types.LOAD_ALL_ROLES_SUCCESS:
        draft.roles = action.payload.data;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        action.payload.data.roles.map((each) => {
          normalizedData[each._id] = each;
          return null;
        });
        draft.one = { ...action.payload.data, rolesNormalized: normalizedData };
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default adminUserManagePageReducer;
