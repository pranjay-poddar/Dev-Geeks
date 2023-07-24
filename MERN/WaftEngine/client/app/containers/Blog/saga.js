import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadBlog({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/blog/${payload}`,
      actions.loadBlogSuccess,
      actions.loadBlogFailure,
      token,
    ),
  );
}

function* loadBlogSuccess({ payload }) {
  const id = payload.data._id;
  yield put(actions.countIncrease(id));
}

function* countIncrease({ payload }) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `blog/count/increase/${payload}`,
      actions.countIncreaseSuccess,
      actions.countIncreaseFailure,
      token,
    ),
  );
}

function* loadRecentBlogs() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/latest`,
      actions.loadRecentBlogsSuccess,
      actions.loadRecentBlogsFailure,
      token,
    ),
  );
}

function* loadRelatedBlogs(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/related/${action.payload}`,
      actions.loadRelatedBlogsSuccess,
      actions.loadRelatedBlogsFailure,
      token,
    ),
  );
}

function* loadArchives(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/blogbytime`,
      actions.loadArchivesSuccess,
      actions.loadArchivesFailure,
      token,
    ),
  );
}

function* loadBlogList(action) {
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map((each) => {
      query = `${query}&${each}=${action.payload[each]}`;
    });
  }
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/public?${query}`,
      actions.loadBlogListSuccess,
      actions.loadBlogListFailure,
      token,
    ),
  );
}

function* loadBlogByAuthor(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map((each) => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbyauthor/${action.payload.key}?${query}`,
      actions.loadBlogByAuthorSuccess,
      actions.loadBlogByAuthorFailure,
      token,
    ),
  );
}

function* loadMoreBlogByAuthor(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map((each) => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbyauthor/${action.payload.key}?${query}`,
      actions.loadMoreBlogByAuthorSuccess,
      actions.loadMoreBlogByAuthorFailure,
      token,
    ),
  );
}

function* loadBlogByTag(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map((each) => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbytag/${action.payload.key}?${query}`,
      actions.loadBlogByTagSuccess,
      actions.loadBlogByTagFailure,
      token,
    ),
  );
}

function* loadMoreBlogByTag(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map((each) => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbytag/${action.payload.key}?${query}`,
      actions.loadMoreBlogByTagSuccess,
      actions.loadMoreBlogByTagFailure,
      token,
    ),
  );
}

function* loadBlogDate(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map((each) => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbytime/${action.payload.key}?${query}`,
      actions.loadBlogDateSuccess,
      actions.loadBlogDateFailure,
      token,
    ),
  );
}
function* loadCategory() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'blog/category?is_active=true',
      actions.loadCategorySuccess,
      actions.loadCategoryFailure,
      token,
    ),
  );
}
function* loadBlogOfCat(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map((each) => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbycat/${action.payload.key}?${query}`,
      actions.loadBlogOfCatSuccess,
      actions.loadBlogOfCatFailure,
      token,
    ),
  );
}

function* loadMoreBlogOfCat(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map((each) => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbycat/${action.payload.key}?${query}`,
      actions.loadMoreBlogOfCatSuccess,
      actions.loadMoreBlogOfCatFailure,
      token,
    ),
  );
}

function* loadHighlight(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `blog/highlight`,
      actions.loadHighlightSuccess,
      actions.loadHighlightFailure,
      token,
    ),
  );
}

function* loadShowCase(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/showcase`,
      actions.loadShowcaseSuccess,
      actions.loadShowcaseFailure,
      token,
    ),
  );
}

function* loadTrending(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/trending`,
      actions.loadTrendingSuccess,
      actions.loadTrendingFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_BLOG_REQUEST, loadBlog);
  yield takeLatest(types.LOAD_BLOG_SUCCESS, loadBlogSuccess);
  yield takeLatest(types.COUNT_INCREASE, countIncrease);

  yield takeLatest(types.LOAD_RECENT_BLOGS_REQUEST, loadRecentBlogs);
  yield takeLatest(types.LOAD_RELATED_BLOGS_REQUEST, loadRelatedBlogs);
  yield takeLatest(types.LOAD_ARCHIVES_REQUEST, loadArchives);

  yield takeLatest(types.LOAD_BLOG_LIST_REQUEST, loadBlogList);
  yield takeLatest(types.LOAD_BLOG_BY_AUTHOR_REQUEST, loadBlogByAuthor);
  yield takeLatest(
    types.LOAD_MORE_BLOG_BY_AUTHOR_REQUEST,
    loadMoreBlogByAuthor,
  );

  yield takeLatest(types.LOAD_BLOG_BY_TAG_REQUEST, loadBlogByTag);
  yield takeLatest(types.LOAD_MORE_BLOG_BY_TAG_REQUEST, loadMoreBlogByTag);

  yield takeLatest(types.LOAD_BLOG_DATE_REQUEST, loadBlogDate);
  yield takeLatest(types.LOAD_CATEGORY_REQUEST, loadCategory);
  yield takeLatest(types.LOAD_BLOG_OF_CAT_REQUEST, loadBlogOfCat);
  yield takeLatest(types.LOAD_MORE_BLOG_OF_CAT_REQUEST, loadMoreBlogOfCat);

  yield takeLatest(types.LOAD_HIGHLIGHT_REQUEST, loadHighlight);
  yield takeLatest(types.LOAD_SHOWCASE_REQUEST, loadShowCase);
  yield takeLatest(types.LOAD_TRENDING_REQUEST, loadTrending);
}
