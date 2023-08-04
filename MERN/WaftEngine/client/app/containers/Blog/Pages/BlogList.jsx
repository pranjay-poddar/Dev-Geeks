import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import HighLightList from '../components/HighlightList';
import RecentBlogs from '../components/RecentBlogs2';
import Showcase from '../components/Showcase';
import Trending from '../components/Trending';
import {
  makeSelectBlogList,
  makeSelectHighlight,
  makeSelectHighlightLoading,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectShowcase,
  makeSelectShowcaseLoading,
  makeSelectTrending,
} from '../selectors';

export const BlogListPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    props.loadBlogListRequest();
    props.loadHighlightRequest();
    props.loadShowcaseRequest();
    props.loadTrendingRequest();
    props.loadRecentBlogsRequest();
  }, []);

  const handlePagination = (paging) => {
    props.loadBlogListRequest(paging);
  };

  const {
    blogList: { data, page, size, totaldata },
    highlight,
    showcase,
    showcaseLoading,
    trending,
    highlightLoading,
  } = props;
  const pagination = { page, size, totaldata };

  return (
    <>
      <Helmet>
        <title>Blogs</title>
      </Helmet>

      <HighLightList
        loading={highlightLoading}
        currentBlogs={highlight}
        pagination={pagination}
        handlePagination={handlePagination}
      />
      <Showcase loading={showcaseLoading} showcase={showcase} />

      <div className="container mx-auto lg:flex">
        <div className="lg:w-3/4 lg:pr-10">
          <div className="layout-2 no-container no-bg"></div>
        </div>
        <div className="lg:w-1/4 mt-16 lg:mt-32 headline-only">
          <RecentBlogs />
          <Trending loading={trending.length === 0} trending={trending} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  blogList: makeSelectBlogList(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  highlight: makeSelectHighlight(),
  showcase: makeSelectShowcase(),
  showcaseLoading: makeSelectShowcaseLoading(),
  trending: makeSelectTrending(),
  highlightLoading: makeSelectHighlightLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogListPage);
