/*
 *
 * GlobalSetting reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  withdraw: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  loading: false,
  query: {},
  one: {
    key: '',
    value_type: 'Boolean',
    value: 'true',
    type: '',
    sub_type: '',
    description: '',
    is_active: true,
    is_removable: false,
  },
  types: [],
  sub_types: [],
};

/* eslint-disable default-case, no-param-reassign */
const globalSettingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_WITHDRAW_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_WITHDRAW_SUCCESS:
        draft.loading = false;
        draft.withdraw = { ...action.payload };
        draft.withdraw.totaldata = action.payload.totalData;
        break;
      case types.LOAD_WITHDRAW_FAILURE:
        draft.loading = false;
        break;

      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;

      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;

      case types.CLEAR_ONE:
        draft.one = initialState.one;
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

      case types.SAVE_REQUEST:
        draft.loading = true;
        break;
      case types.SAVE_SUCCESS:
        draft.loading = false;
        break;
      case types.SAVE_FAILURE:
        draft.loading = false;
        break;

      case types.LOAD_TYPE_SUCCESS:
        draft.types = action.payload.data;
        break;

      case types.LOAD_SUB_TYPE_SUCCESS:
        draft.sub_types = action.payload.data;
        break;

      case types.DELETE_ONE_SUCCESS:
        draft.withdraw = {
          ...draft.withdraw,
          data: draft.withdraw.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
    }
  });

export default globalSettingReducer;
