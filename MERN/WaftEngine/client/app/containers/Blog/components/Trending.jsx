/* eslint-disable no-nested-ternary */
import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';

const TrendingList = (props) => {
  const { trending, loading } = props;
  useEffect(() => {}, [trending]);
  return loading ? (
    <span />
  ) : (
    <>
      {trending && trending.length > 0 && (
        <div className="bg-gray-100 mt-10 md:mt-32">
          <div className="bg-primary h-14 flex items-center pl-8 mb-6">
            <h2 className="font-bold text-3xl text-white my-0">Trending</h2>
          </div>
          {trending.map((each, index) => (
            <Link
              to={`/blog/${moment(each.added_at).format('YYYY/MM/DD')}/${
                each._id
              }`}
              key={each._id}
              className={`block p-5 item-${index + 1}`}
            >
              <div className="flex flex-wrap">
                <span className="font-bold text-primary rounded-full h-12 w-12 flex justify-center bg-gray-300 items-center text-3xl">
                  {index + 1}.
                </span>
                <div className="flex-1 pl-6">
                  <h3 className="no-underline hover:text-blue-500 text-xl block text-gray-700 font-bold md:font-normal leading-normal">
                    {each.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

TrendingList.propTypes = {
  trending: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(TrendingList);
