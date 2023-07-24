/* eslint-disable no-nested-ternary */
import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGE_BASE } from '../../App/constants';
import * as mapDispatchToProps from '../actions';

const RenderBlogs = (props) => {
  const { currentBlogs, loading, pagination, handleLoadMore, loading_more } =
    props;
  const pagenumber = [];
  for (let i = 1; i <= Math.ceil(pagination.totaldata / pagination.size); i++) {
    pagenumber.push(i);
  }
  const [lastTop, setLastTop] = useState(0);

  useEffect(() => {
    window.scrollTo(0, lastTop - 140);
  }, [loading_more]);
  const lastDiv = useRef(null);

  const handleLoadMoreContent = () => {
    handleLoadMore({ ...pagination, page: pagination.page + 1 });
    const top = lastDiv.current.offsetTop;
    setLastTop(top);
  };

  return loading ? (
    <>
      <div />
    </>
  ) : currentBlogs.length > 0 ? (
    <>
      {currentBlogs.map((each, index) => {
        const {
          image,
          title,
          author,
          slug_url,
          short_description,
          added_at,
          tags,
          _id,
        } = each;

        return (
          <Link
            className="block pb-6 mb-6 border-b border-gray-300"
            to={`/blog/${moment(added_at).format('YYYY/MM/DD')}/${_id}`}
            key={`${slug_url}-${_id}`}
          >
            <div
              key={_id}
              className="flex article-container"
              ref={index === currentBlogs.length - 1 ? lastDiv : null}
            >
              <div className="overflow-hidden h-20 md:h-48 w-24 md:w-64 article-image">
                <img
                  className="object-cover"
                  src={image && `${IMAGE_BASE}${image.path}`}
                  alt={`${title}`}
                />
              </div>

              <div className="flex-1 px-4 md:px-10">
                <h2 className="text-xl md:text-3xl hover:text-blue-500 font-normal">
                  {title}
                </h2>

                <div className="inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date">
                  <FaRegClock className="mr-2" />
                  {moment(each.added_at).fromNow()}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      <div className="flex flow-root w-full pagination ">
        {loading_more && '....'}
        {currentBlogs.length < pagination.totaldata && (
          <button
            type="button"
            className="btn w-full border border-secondary bg-blue-100 mb-8 text-blue-500 mt-4"
            onClick={handleLoadMoreContent}
          >
            Load More
          </button>
        )}
      </div>
    </>
  ) : (
    <div>No Blog Found</div>
  );
};

RenderBlogs.propTypes = {
  currentBlogs: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(RenderBlogs);
