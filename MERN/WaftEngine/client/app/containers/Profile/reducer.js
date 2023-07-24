import produce from 'immer';
import * as types from './constants';

export const initialState = {
  one: {
    name: '',
    email: '',
    roles: [],
    avatar: null,
    date_of_birth: '',
    email_verified: false,
  },
  changePassword: '',
  errors: {},
  twoFactor: {
    email: {
      is_authenticate: false,
    },
    google_authenticate: {
      is_authenticate: false,
    },
  },
  helperObj: { showGoogleTwoFactor: false },
  loading: false,
  loadingObj: {
    loadTwoFactor: false,
    addEmailAuth: false,
    addGoogleAuth: false,
    setGoogleCode: false,
  },
  token: false,
  verification_code: '',
};

/* eslint-disable default-case, no-param-reassign */
const userPersonalInformationPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.CLEAR_DATA:
        draft[action.payload.name] = initialState[action.payload.name];
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.SET_VALUE:
        draft[action.payload.name][action.payload.key] = action.payload.value;
        break;
      case types.SET_CODE_VALUE:
        draft.verification_code = action.payload.value;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        draft.email_verified = action.payload.data.email_verified;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.CHANGE_PASSWORD_SUCCESS:
        draft.changePassword = initialState;
        break;
      case types.CHANGE_PASSWORD_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.VERIFY_EMAIL_SUCCESS:
        localStorage.setItem(
          'token',
          action.payload.token || localStorage.token,
        );
        draft.token = true;
        break;

      case types.LOAD_TWO_FACTOR_REQUEST:
        draft.loadingObj.loadTwoFactor = true;
        break;
      case types.LOAD_TWO_FACTOR_SUCCESS:
        draft.loadingObj.loadTwoFactor = false;
        draft.twoFactor = { ...action.payload.data.multi_fa };
        break;
      case types.LOAD_TWO_FACTOR_FAILURE:
        draft.loadingObj.loadTwoFactor = false;
        break;
      case types.ADD_EMAIL_TWO_FACTOR_REQUEST:
        draft.loadingObj.addEmailAuth = true;
        // console.log('true');
        break;
      case types.ADD_EMAIL_TWO_FACTOR_SUCCESS:
        draft.loadingObj.addEmailAuth = false;
        draft.twoFactor = {
          ...state.twoFactor,
          email: { ...state.twoFactor.email, ...action.payload.data },
        };
        break;
      case types.ADD_EMAIL_TWO_FACTOR_FAILURE:
        draft.loadingObj.addEmailAuth = false;
        break;
      case types.ADD_GOOGLE_TWO_FACTOR_REQUEST:
        draft.loadingObj.addGoogleAuth = true;
        break;
      case types.ADD_GOOGLE_TWO_FACTOR_SUCCESS:
        draft.loadingObj.addGoogleAuth = false;
        draft.twoFactor = {
          ...state.twoFactor,
          google_authenticate: {
            ...action.payload.data.multi_fa.google_authenticate,
            qrcode: action.payload.data.multi_fa.google_authenticate.qrcode,
            email: action.payload.data.email,
            auth_secret_setup:
              action.payload.data.multi_fa.google_authenticate
                .auth_secret_setup,
            setup: action.payload.data.multi_fa.google_authenticate.setup,
          },
        };
        draft.helperObj.showGoogleTwoFactor =
          action.payload &&
          action.payload.data &&
          action.payload.data.multi_fa &&
          action.payload.data.multi_fa.google_authenticate &&
          action.payload.data.multi_fa.google_authenticate.hasOwnProperty(
            'is_authenticate',
          )
            ? action.payload.data.multi_fa.google_authenticate.is_authenticate
            : true;
        break;
      case types.ADD_GOOGLE_TWO_FACTOR_FAILURE:
        draft.loadingObj.addGoogleAuth = false;
        break;
      case types.SET_GOOGLE_TWO_FACTOR_REQUEST:
        draft.loadingObj.setGoogleCode = true;
        break;
      case types.SET_GOOGLE_TWO_FACTOR_SUCCESS:
        draft.loadingObj.setGoogleCode = false;
        draft.twoFactor = {
          ...state.twoFactor,
          google_authenticate: {
            ...state.twoFactor.google_authenticate,
            ...action.payload.data,
          },
        };
        draft.helperObj.showGoogleTwoFactor = false;
        break;
      case types.SET_GOOGLE_TWO_FACTOR_FAILURE:
        draft.loadingObj.setGoogleCode = false;
        draft.errors = { ...state.errors, ...action.payload.data };
        break;
    }
  });

export default userPersonalInformationPageReducer;
