import moment from 'moment';
import PropTypes from 'prop-types';
import { FaRegClock } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { IMAGE_BASE } from '../../App/constants';
import {
  makeSelectRecentBlogs,
  makeSelectRecentBlogsIsLoading,
} from '../selectors';

function RecentBlogs(props) {
  if (props.loading) {
    return <div />;
  }
  return (
    <div className="">
      <div className="bg-primary h-14 flex items-center pl-8 mb-4">
        <h2 className="font-bold text-3xl text-white my-0">Recent Posts</h2>
      </div>
      {props.blogs.map((blog) => (
        <div key={`recents-${blog._id}`} className="flex py-4">
          <div className="flex-1 mr-7">
            <Link
              className="no-underline hover:text-blue-500 text-xl block text-gray-700"
              to={`/blog/${moment(blog.added_at).format('YYYY/MM/DD')}/${
                blog._id
              }`}
            >
              {blog.title}
            </Link>
            <div className="inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date">
              <FaRegClock className="mr-2" />
              {moment(blog.added_at).fromNow()}
            </div>
          </div>
          <Link
            className="block overflow-hidden w-24 h-24 article-img-container"
            to={`/blog/${moment(blog.added_at).format('YYYY/MM/DD')}/${
              blog._id
            }`}
          >
            <img
              src={`${IMAGE_BASE}${blog && blog.image && blog.image.path}`}
              alt={blog.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

RecentBlogs.propTypes = {
  loading: PropTypes.bool.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectRecentBlogsIsLoading(),
  blogs: makeSelectRecentBlogs(),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(RecentBlogs);
