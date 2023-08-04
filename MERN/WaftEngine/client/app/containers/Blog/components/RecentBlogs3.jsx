import moment from 'moment';
import PropTypes from 'prop-types';
import { FaRegClock } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div className="bg-primary h-14 flex items-center pl-8">
        <h2 className="font-bold text-3xl my-0">Recent Blog</h2>
      </div>
      {props.blogs.map((blog) => (
        <div
          key={`recents-${blog._id}`}
          className="flex py-5  border-b border-gray-300 borderlist"
        >
          <div key={blog._id} className={`px-2 mb-4 h-full item-${index + 1}`}>
            <div className="article-container bg-gray-100 h-full">
              <div className="article-img-container">
                <Link
                  to={`/blog/${moment(blog.added_at).format('YYYY/MM/DD')}/${
                    blog._id
                  }`}
                >
                  <img
                    src={`${IMAGE_BASE}${
                      blog && blog.image && blog.image.path
                    }`}
                    className="object-cover article-img"
                    alt={`${blog.title}`}
                  />
                </Link>
              </div>
              <div className="p-4 textpart">
                <Link
                  to={`/blog/${moment(blog.added_at).format('YYYY/MM/DD')}/${
                    blog._id
                  }`}
                  className="text-xl leading-normal hover:text-blue-500 pointer no-underline article-title font-mukta"
                >
                  {blog.title}
                </Link>

                <p className="hidden font-mukta-regular text-lg md:text-xl short-description">
                  {blog.short_description}
                </p>
                <div>
                  <div className="inline-flex items-center hidden mt-3 mr-8 author">
                    <span className="bg-secondary w-8 h-8 rounded-full inline-flex items-center justify-center">
                      <img className="h-4" src={logo} />
                    </span>
                    <span className="text-gray-800 text-sm sans-serif author-name ml-3">
                      {blog.author && blog.author.map((author) => author.name)}
                    </span>
                  </div>
                  <div className="inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date">
                    <FaRegClock className="mr-2" />
                    {moment(blog.added_at).fromNow()}
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps)(RecentBlogs);
