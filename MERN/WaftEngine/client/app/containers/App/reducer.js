/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import produce from 'immer';

import * as types from './constants';

// The initial state of the App
export const initialState = {
  user: { isAdmin: false },
  token: '',
  content: { image: {}, ids: {}, is_page: {} },
  media: {},
  slide: {},
  notifications: [],
  access: {},
  latestBlogs: {},
  menu: {},
  blogLoading: false,
  faqData: {
    cat: {},
    faq: [],
  },
  showExpired: false,
};

/* eslint-disable default-case */
const appReducer = (state = initialState, action = { type: '' }) =>
  produce(state, (draft) => {
    const access = {};
    let isAdmin = false;
    switch (action.type) {
      case types.SET_USER:
        localStorage.setItem(
          'routes',
          action.payload.routes
            ? JSON.stringify(action.payload.routes)
            : localStorage.routes,
        );
        (action.payload.routes || []).map((each) => {
          if (each.admin_routes.includes('/admin/dashboard')) {
            isAdmin = true;
          }
          each.admin_routes.map((route) => {
            access[route] = [...(access[route] || []), each.access_type];
          });
        });
        draft.user = {
          ...action.payload,
          isAdmin,
        };
        draft.access = access;
        break;
      case types.SET_TOKEN:
        localStorage.setItem('token', action.payload);
        draft.token = action.payload;
        break;
      case types.LOGOUT:
      case types.LOGOUT_SUCCESS:
        localStorage.setItem('token', '');
        localStorage.setItem('routes', '');
        draft.user = {};
        draft.token = '';
        break;
      case types.LOAD_CONTENT_SUCCESS:
        draft.content = {
          ...draft.content,
          [action.payload.data.key]: action.payload.data.description,
          image: {
            ...draft.content.image,
            [action.payload.data.key]: action.payload.data.image,
          },

          ids: {
            ...draft.content.ids,
            [action.payload.data.key]: action.payload.data._id,
          },
          is_page: {
            ...draft.content.is_page,
            [action.payload.data.key]: action.payload.data.is_page,
          },
        };
        break;
      case types.LOAD_MEDIA_SUCCESS:
        draft.media = {
          ...draft.media,
          [action.payload.data._id]: action.payload.data, // eslint-disable-line no-underscore-dangle
        };
        break;
      case types.LOAD_SLIDE_SUCCESS:
        draft.slide = {
          ...draft.slide,
          [action.payload.data.slider_key]: action.payload.data,
        };
        break;
      case types.LOAD_LATEST_BLOGS_SUCCESS:
        draft.latestBlogs[action.payload.data.category._id] =
          action.payload.data;
        draft.blogLoading = false;
        break;
      case types.LOAD_LATEST_BLOGS_REQUEST:
        draft.blogLoading = true;
        break;
      case types.LOAD_LATEST_BLOGS_FAILURE:
        draft.blogLoading = false;
        break;
      case types.ENQUEUE_SNACKBAR:
        draft.notifications = [...draft.notifications, { ...action.payload }];
        break;
      case types.REMOVE_SNACKBAR:
        draft.notifications = [
          ...draft.notifications.filter(
            (notification) => notification.key !== action.payload,
          ),
        ];
        break;
      case types.LOAD_MENU_SUCCESS:
        draft.menu = {
          ...draft.menu,
          [action.payload.data.key]: action.payload.data.child,
        };
        break;

      case types.LOAD_FAQ_SUCCESS:
        const tempKey = action.payload.data.cat.key;
        draft.faqData = { ...draft.faqData, [tempKey]: action.payload.data };
        break;

      case types.SESSION_EXPIRED:
        draft.showExpired = true;
        break;

      case types.SET_EXPIRED:
        draft.showExpired = action.payload;
        break;
    }
  });

export default appReducer;
