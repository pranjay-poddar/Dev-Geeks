import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import * as mapDispatchToProps from '../actions';
import RenderBlogs from '../components/BlogList';
import RecentBlogs from '../components/RecentBlogs';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectBlogOfCat,
  makeSelectCategoryTitle,
  makeSelectLoadingBlogOfCat,
  makeSelectLoadingMoreBlogOfCat,
} from '../selectors';

const CategoryDetailPage = (props) => {
  useInjectReducer({ key: 'blogPage', reducer });
  useInjectSaga({ key: 'blogPage', saga });
  const { slug_url } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    props.loadBlogOfCatRequest({ key: slug_url, value: '' });
    props.loadRecentBlogsRequest();
    return () => {
      props.clearBlog();
    };
  }, [slug_url]);

  const handlePagination = (paging) => {
    props.loadBlogOfCatRequest({
      key: slug_url,
      value: paging,
    });
  };

  const handleLoadMore = (paging) => {
    props.loadMoreBlogOfCatRequest({
      key: slug_url,
      value: paging,
    });
  };

  const {
    blog: { data, page, size, totaldata },
    loading,
    title,
    loading_more,
  } = props;
  const pagination = { page, size, totaldata };
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="relative py-6 bg-white shadow">
        <div className="container mx-auto">
          <h1 className="text-primary text-4xl font-bold">
            {!loading && `${title}`}
          </h1>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="lg:flex flex-wrap">
          <div className="lg:w-3/4 lg:pr-10">
            <RenderBlogs
              loading={loading}
              currentBlogs={data}
              pagination={pagination}
              handlePagination={this.handlePagination}
              loading_more={loading_more}
              handleLoadMore={this.handleLoadMore}
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

CategoryDetailPage.propTypes = {
  loadBlogRequest: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlogOfCat(),
  loading: makeSelectLoadingBlogOfCat(),
  title: makeSelectCategoryTitle(),
  loading_more: makeSelectLoadingMoreBlogOfCat(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailPage);
