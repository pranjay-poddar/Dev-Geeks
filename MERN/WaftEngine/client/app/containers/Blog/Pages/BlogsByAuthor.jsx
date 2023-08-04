import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import RenderBlogs from '../components/BlogList';
import RecentBlogs from '../components/RecentBlogs';
import {
  makeSelectBlogByAuthor,
  makeSelectLoading,
  makeSelectLoadingMoreBlogOfCat,
  makeSelectQuery,
} from '../selectors';

/* eslint-disable react/prefer-stateless-function */
export const BlogByAuthor = (props) => {
  const { author } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    props.loadRecentBlogsRequest();

    if (author) {
      props.loadBlogByAuthorRequest({
        key: author,
        value: '',
      });
    }
  }, [author]);

  const handlePagination = (paging) => {
    props.loadBlogByAuthorRequest({
      key: author,
      value: paging,
    });
  };

  const handleLoadMore = (paging) => {
    props.loadMoreBlogByAuthorRequest({
      key: author,
      value: paging,
    });
  };

  const {
    blogByAuthor: { data, page, size, totaldata },
    loading,
    loading_more,
  } = props;
  const pagination = { page, size, totaldata };

  return (
    <>
      <Helmet>
        <title>Blogs By Author</title>
      </Helmet>
      <div className="container mx-auto pt-10">
        <h1 className="pb-5 mb-0 border-b border-gray-300 text-black text-4xl font-light font-mukta">
          {data &&
            data.length > 0 &&
            data[0].author &&
            `Blogs By ${data[0].author[0].name}`}
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
  blogByAuthor: makeSelectBlogByAuthor(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  loading_more: makeSelectLoadingMoreBlogOfCat(),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogByAuthor);
