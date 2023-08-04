import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = (state) => state.router;
export const reduxKey = 'global';

export const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.location);

const selectGlobal = (state) => state[reduxKey] || initialState;

export const makeSelectIsAuthenticated = () =>
  createSelector(selectGlobal, (state) => !!state.token);

export const makeSelectToken = () =>
  createSelector(selectGlobal, (state) => state.token);

export const makeSelectUser = () =>
  createSelector(selectGlobal, (state) => state.user);

export const makeSelectUserIsAdmin = () =>
  createSelector(makeSelectUser(), (state) => state.isAdmin);

export const makeSelectRoles = () =>
  createSelector(makeSelectUser(), (state) => state.roles);

export const makeSelectContent = () =>
  createSelector(selectGlobal, (state) => state.content);

export const makeSelectMedia = () =>
  createSelector(selectGlobal, (state) => state.media);

export const makeSelectSlide = () =>
  createSelector(selectGlobal, (state) => state.slide);

export const makeSelectLatestBlogs = () =>
  createSelector(selectGlobal, (state) => state.latestBlogs);

export const makeSelectNotifications = () =>
  createSelector(selectGlobal, (state) => state.notifications);

export const makeSelectAccess = () =>
  createSelector(selectGlobal, (state) => state.access);

export const makeSelectCategory = () =>
  createSelector(selectGlobal, (state) => state.category);

export const makeSelectMenu = () =>
  createSelector(selectGlobal, (state) => state.menu);

export const makeSelectBlogLoading = () =>
  createSelector(selectGlobal, (state) => state.blogLoading);

export const makeSelectFaqData = () =>
  createSelector(selectGlobal, (state) => state.faqData);

export const makeSelectShowExpired = () =>
  createSelector(selectGlobal, (state) => state.showExpired);
