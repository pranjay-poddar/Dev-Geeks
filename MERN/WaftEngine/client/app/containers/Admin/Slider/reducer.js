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
    slider_name: '',
    slider_key: '',
    settings: '',
    images: [],
    slider_setting: {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      centerMode: false,
      centerPadding: '',
      autoplay: true,
      autoplaySpeed: 2000,
      focusOnSelect: true,
      slidesPerRow: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    },
  },
  media: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  query: { find_slider_name: '', size: 10 },
  loading: false,
  errors: { slider_name: '', slider_key: '' },
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_QUERY_OBJ:
        draft.query = action.payload;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = ' ';
        break;

      case types.SET_ARRAY_VALUE:
        draft.one.images[action.payload.index][action.payload.key] =
          action.payload.value;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_MEDIA_SUCCESS:
        draft.media = action.payload;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        break;
      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            (each) => each._id !== action.payload.data._id,
          ),
        };
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.SET_SLIDER_VALUE:
        draft.one.slider_setting[action.payload.key] = action.payload.value;
        break;
    }
  });

export default reducer;
