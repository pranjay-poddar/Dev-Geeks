import produce from 'immer';
import * as types from './constants';

export const initialState = {
  faq: {},
  loading: false,
};

const faqPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_FAQ_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_FAQ_SUCCESS:
        draft.faq = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_FAQ_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default faqPageReducer;
