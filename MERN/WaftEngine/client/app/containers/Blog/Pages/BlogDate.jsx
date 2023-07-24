import moment from 'moment';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import RenderBlogs from '../components/BlogList';
import { makeSelectBlogDate, makeSelectDateLoading } from '../selectors';

export const BlogDatePage = (props) => {
  const { date } = useParams();
  useEffect(() => {
    props.loadBlogDateRequest({
      key: date,
      value: '',
    });
  }, [date]);

  const handlePagination = (paging) => {
    props.loadBlogDateRequest({
      key: date,
      value: paging,
    });
  };

  const {
    blogDate: { data, page, size, totaldata },
    loading,
  } = props;
  const pagination = { page, size, totaldata };

  return (
    <>
      <Helmet>
        <title>Blog By Date</title>
      </Helmet>
      <div className="bg-star h-48 relative text-center py-12">
        <h1 className="mb-4 text-gray-700 text-4xl font-bold">
          {data &&
            data.length > 0 &&
            moment(data[0].added_at).format('MMMM YYYY')}
        </h1>
      </div>
      <div className="container mx-auto md:flex py-10">
        <div className="md:w-3/4 md:px-5">
          {data && data.length > 0 && (
            <RenderBlogs
              loading={loading}
              currentBlogs={data}
              pagination={pagination}
              handlePagination={handlePagination}
            />
          )}
        </div>
        <div className="md:w-1/4 pt-10 px-5"></div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  blogDate: makeSelectBlogDate(),
  loading: makeSelectDateLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogDatePage);
