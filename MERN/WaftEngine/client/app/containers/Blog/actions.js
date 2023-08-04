import * as types from './constants';

export const clearData = payload => ({
  type: types.CLEAR_DATA,
  payload,
});
export const loadBlogRequest = payload => ({
  type: types.LOAD_BLOG_REQUEST,
  payload,
});
export const loadBlogSuccess = payload => ({
  type: types.LOAD_BLOG_SUCCESS,
  payload,
});
export const loadBlogFailure = payload => ({
  type: types.LOAD_BLOG_FAILURE,
  payload,
});
export const loadRelatedBlogsRequest = payload => ({
  type: types.LOAD_RELATED_BLOGS_REQUEST,
  payload,
});
export const loadRelatedBlogsSuccess = payload => ({
  type: types.LOAD_RELATED_BLOGS_SUCCESS,
  payload,
});
export const loadRelatedBlogsFailure = payload => ({
  type: types.LOAD_RELATED_BLOGS_FAILURE,
  payload,
});

export const loadRecentBlogsRequest = payload => ({
  type: types.LOAD_RECENT_BLOGS_REQUEST,
  payload,
});
export const loadRecentBlogsSuccess = payload => ({
  type: types.LOAD_RECENT_BLOGS_SUCCESS,
  payload,
});
export const loadRecentBlogsFailure = payload => ({
  type: types.LOAD_RECENT_BLOGS_FAILURE,
  payload,
});
export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});

export const clearOne = payload => ({
  type: types.CLEAR_ONE,
  payload,
});

export const loadArchivesRequest = payload => ({
  type: types.LOAD_ARCHIVES_REQUEST,
  payload,
});
export const loadArchivesSuccess = payload => ({
  type: types.LOAD_ARCHIVES_SUCCESS,
  payload,
});
export const loadArchivesFailure = payload => ({
  type: types.LOAD_ARCHIVES_FAILURE,
  payload,
});

export const loadBlogListRequest = payload => ({
  type: types.LOAD_BLOG_LIST_REQUEST,
  payload,
});
export const loadBlogListSuccess = payload => ({
  type: types.LOAD_BLOG_LIST_SUCCESS,
  payload,
});
export const loadBlogListFailure = payload => ({
  type: types.LOAD_BLOG_LIST_FAILURE,
  payload,
});
export const setPagesValue = payload => ({
  type: types.SET_PAGES_VALUE,
  payload,
});

export const setSizeValue = payload => ({
  type: types.SET_SIZE_VALUE,
  payload,
});

export const loadBlogByAuthorRequest = payload => ({
  type: types.LOAD_BLOG_BY_AUTHOR_REQUEST,
  payload,
});
export const loadBlogByAuthorSuccess = payload => ({
  type: types.LOAD_BLOG_BY_AUTHOR_SUCCESS,
  payload,
});
export const loadBlogByAuthorFailure = payload => ({
  type: types.LOAD_BLOG_BY_AUTHOR_FAILURE,
  payload,
});

export const loadMoreBlogByAuthorRequest = payload => ({
  type: types.LOAD_MORE_BLOG_BY_AUTHOR_REQUEST,
  payload,
});
export const loadMoreBlogByAuthorSuccess = payload => ({
  type: types.LOAD_MORE_BLOG_BY_AUTHOR_SUCCESS,
  payload,
});
export const loadMoreBlogByAuthorFailure = payload => ({
  type: types.LOAD_MORE_BLOG_BY_AUTHOR_FAILURE,
  payload,
});

export const loadBlogByTagRequest = payload => ({
  type: types.LOAD_BLOG_BY_TAG_REQUEST,
  payload,
});
export const loadBlogByTagSuccess = payload => ({
  type: types.LOAD_BLOG_BY_TAG_SUCCESS,
  payload,
});
export const loadBlogByTagFailure = payload => ({
  type: types.LOAD_BLOG_BY_TAG_FAILURE,
  payload,
});

export const loadMoreBlogByTagRequest = payload => ({
  type: types.LOAD_MORE_BLOG_BY_TAG_REQUEST,
  payload,
});
export const loadMoreBlogByTagSuccess = payload => ({
  type: types.LOAD_MORE_BLOG_BY_TAG_SUCCESS,
  payload,
});
export const loadMoreBlogByTagFailure = payload => ({
  type: types.LOAD_MORE_BLOG_BY_TAG_FAILURE,
  payload,
});

export const loadBlogDateRequest = payload => ({
  type: types.LOAD_BLOG_DATE_REQUEST,
  payload,
});
export const loadBlogDateSuccess = payload => ({
  type: types.LOAD_BLOG_DATE_SUCCESS,
  payload,
});
export const loadBlogDateFailure = payload => ({
  type: types.LOAD_BLOG_DATE_FAILURE,
  payload,
});

export const loadCategoryRequest = payload => ({
  type: types.LOAD_CATEGORY_REQUEST,
  payload,
});
export const loadCategorySuccess = payload => ({
  type: types.LOAD_CATEGORY_SUCCESS,
  payload,
});
export const loadCategoryFailure = payload => ({
  type: types.LOAD_CATEGORY_FAILURE,
  payload,
});

export const loadBlogOfCatRequest = payload => ({
  type: types.LOAD_BLOG_OF_CAT_REQUEST,
  payload,
});
export const loadBlogOfCatSuccess = payload => ({
  type: types.LOAD_BLOG_OF_CAT_SUCCESS,
  payload,
});
export const loadBlogOfCatFailure = payload => ({
  type: types.LOAD_BLOG_OF_CAT_FAILURE,
  payload,
});

export const loadMoreBlogOfCatRequest = payload => ({
  type: types.LOAD_MORE_BLOG_OF_CAT_REQUEST,
  payload,
});
export const loadMoreBlogOfCatSuccess = payload => ({
  type: types.LOAD_MORE_BLOG_OF_CAT_SUCCESS,
  payload,
});
export const loadMoreBlogOfCatFailure = payload => ({
  type: types.LOAD_MORE_BLOG_OF_CAT_FAILURE,
  payload,
});

export const clearBlog = () => ({
  type: types.CLEAR_BLOG,
});

export const loadHighlightRequest = payload => ({
  type: types.LOAD_HIGHLIGHT_REQUEST,
  payload,
});
export const loadHighlightSuccess = payload => ({
  type: types.LOAD_HIGHLIGHT_SUCCESS,
  payload,
});
export const loadHighlightFailure = payload => ({
  type: types.LOAD_HIGHLIGHT_FAILURE,
  payload,
});

export const loadShowcaseRequest = payload => ({
  type: types.LOAD_SHOWCASE_REQUEST,
  payload,
});
export const loadShowcaseSuccess = payload => ({
  type: types.LOAD_SHOWCASE_SUCCESS,
  payload,
});
export const loadShowcaseFailure = payload => ({
  type: types.LOAD_SHOWCASE_FAILURE,
  payload,
});

export const loadTrendingRequest = payload => ({
  type: types.LOAD_TRENDING_REQUEST,
  payload,
});
export const loadTrendingSuccess = payload => ({
  type: types.LOAD_TRENDING_SUCCESS,
  payload,
});
export const loadTrendingFailure = payload => ({
  type: types.LOAD_TRENDING_FAILURE,
  payload,
});

export const countIncrease = payload => ({
  type: types.COUNT_INCREASE,
  payload,
});

export const countIncreaseSuccess = payload => ({
  type: types.COUNT_INCREASE_SUCCESS,
  payload,
});
export const countIncreaseFailure = payload => ({
  type: types.COUNT_INCREASE_FAILURE,
  payload,
});
