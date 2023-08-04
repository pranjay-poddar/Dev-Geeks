import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const reduxKey = 'blogPage';

const selectDomain = (state) => state[reduxKey] || initialState;

export const makeSelectBlog = () =>
  createSelector(selectDomain, (state) => state.blog);

export const makeSelectMessage = () =>
  createSelector(selectDomain, (state) => state.message);

export const makeSelectHighlight = () =>
  createSelector(selectDomain, (state) => state.highlight);
export const makeSelectLoading = () =>
  createSelector(selectDomain, (state) => state.loading);
export const makeSelectHighlightLoading = () =>
  createSelector(selectDomain, (state) => state.highlightLoading);

export const makeSelectRelatedBlogs = () =>
  createSelector(selectDomain, (state) => state.relatedBlogs);

export const makeSelectRelatedBlogsIsLoading = () =>
  createSelector(selectDomain, (state) => state.relatedBlogsIsLoading);

export const makeSelectRecentBlogs = () =>
  createSelector(selectDomain, (state) => state.recentBlogs);

export const makeSelectArchives = () =>
  createSelector(selectDomain, (state) => state.archives);

export const makeSelectRecentBlogsIsLoading = () =>
  createSelector(selectDomain, (state) => state.recentBlogsIsLoading);

export const makeSelectOne = () =>
  createSelector(selectDomain, (state) => state.one);

export const makeSelectArchiveLoading = () =>
  createSelector(selectDomain, (state) => state.archiveLoading);

export const makeSelectBlogList = () =>
  createSelector(selectDomain, (state) => state.blogList);

export const makeSelectBlogByAuthor = () =>
  createSelector(selectDomain, (state) => state.blogByAuthor);

export const makeSelectBlogByTag = () =>
  createSelector(selectDomain, (state) => state.blogByTag);

export const makeSelectBlogDate = () =>
  createSelector(selectDomain, (state) => state.blogDate);

export const makeSelectDateLoading = () =>
  createSelector(selectDomain, (state) => state.dateLoading);

export const makeSelectQuery = () =>
  createSelector(selectDomain, (state) => state.query);

export const makeSelectCategory = () =>
  createSelector(selectDomain, (state) => state.category);

export const makeSelectCategoryLoading = () =>
  createSelector(selectDomain, (state) => state.catLoading);

export const makeSelectBlogOfCat = () =>
  createSelector(selectDomain, (state) => state.blogOfCat);

export const makeSelectLoadingBlogOfCat = () =>
  createSelector(selectDomain, (state) => state.loadingBlogOfCat);

export const makeSelectLoadingMoreBlogOfCat = () =>
  createSelector(selectDomain, (state) => state.loadingMoreBlogOfCat);
export const makeSelectCategoryTitle = () =>
  createSelector(selectDomain, (state) => state.categoryTitle);

export const makeSelectShowcaseLoading = () =>
  createSelector(selectDomain, (state) => state.showcaseLoading);

export const makeSelectShowcase = () =>
  createSelector(selectDomain, (state) => state.showcase);

export const makeSelectTrending = () =>
  createSelector(selectDomain, (state) => state.trending);
