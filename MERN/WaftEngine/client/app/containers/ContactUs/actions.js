import * as types from './constants';

export const saveContactRequest = payload => ({
  type: types.SAVE_CONTACT_REQUEST,
  payload,
});
export const saveContactSuccess = payload => ({
  type: types.SAVE_CONTACT_SUCCESS,
  payload,
});
export const saveContactFailure = payload => ({
  type: types.SAVE_CONTACT_FAILURE,
  payload,
});

export const ContactDetailRequest = payload => ({
  type: types.CONTACT_DETAIL_REQUEST,
  payload,
});
export const contactDetailSuccess = payload => ({
  type: types.CONTACT_DETAIL_SUCCESS,
  payload,
});
export const contactDetailFailure = payload => ({
  type: types.CONTACT_DETAIL_FAILURE,
  payload,
});
