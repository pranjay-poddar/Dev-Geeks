import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import RenderBlogs from '../components/BlogList';
import RecentBlogs from '../components/RecentBlogs';
import {
  makeSelectBlogByTag,
  makeSelectLoading,
  makeSelectLoadingMoreBlogOfCat,
  makeSelectQuery,
} from '../selectors';
export const BlogsByTag = (props) => {
  const { tag } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    props.loadRecentBlogsRequest();

    if (tag) {
      props.loadBlogByTagRequest({
        key: tag,
        value: '',
      });
    }
  }, [tag]);

  const handlePagination = (paging) => {
    props.loadBlogListRequest({
      key: tag,
      value: paging,
    });
  };

  const handleLoadMore = (paging) => {
    props.loadMoreBlogByTagRequest({
      key: tag,
      value: paging,
    });
  };

  const {
    blogByTag: { data, page, size, totaldata },
    loading,
    loading_more,
  } = props;
  const pagination = { page, size, totaldata };

  return (
    <>
      <Helmet>
        <title>Blogs By Tag</title>
      </Helmet>
      <div className="container mx-auto pt-10">
        <h1 className="pb-5 mb-0 border-b border-gray-300 text-black text-4xl font-light font-mukta">
          {tag}
        </h1>
      </div>
      <div className="container mx-auto py-10">
        <div className="lg:flex flex-wrap">
          <div className="lg:w-3/4 lg:pr-10">
            <RenderBlogs
              loading={loading}
              currentBlogs={data}
              pagination={pagination}
              handlePagination={handlePagination}
              loading_more={loading_more}
              handleLoadMore={handleLoadMore}
            />
          </div>
          <div className="lg:w-1/4">
            <RecentBlogs />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  blogByTag: makeSelectBlogByTag(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  loading_more: makeSelectLoadingMoreBlogOfCat(),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogsByTag);
