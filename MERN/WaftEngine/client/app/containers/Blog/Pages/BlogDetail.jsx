/**
 *
 * BlogPage
 *
 */
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser, makeSelectUserIsAdmin } from '../../App/selectors';
import * as mapDispatchToProps from '../actions';
import BlogDetail from '../components/BlogDetail';
import {
  makeSelectBlog,
  makeSelectLoading,
  makeSelectMessage,
} from '../selectors';

export const BlogPage = (props) => {
  const { slug_url } = useParams();
  useEffect(() => {
    props.clearOne();

    props.loadRecentBlogsRequest();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.loadRelatedBlogsRequest(slug_url);
    props.loadBlogRequest(slug_url);
  }, [slug_url]);

  const { blog, loading, message, isAdmin } = props;

  return (
    <>
      <Helmet>
        <title>{blog && blog.title}</title>
      </Helmet>
      <div className="container mx-auto py-10 md:pt-16">
        <BlogDetail
          blog={blog}
          loading={loading}
          message={message}
          isAdmin={isAdmin}
        />
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog(),
  loading: makeSelectLoading(),
  user: makeSelectUser(),
  message: makeSelectMessage(),
  isAdmin: makeSelectUserIsAdmin(),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
