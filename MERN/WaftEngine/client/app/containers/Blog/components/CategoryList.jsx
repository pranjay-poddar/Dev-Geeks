import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { loadCategoryRequest } from '../actions';
import saga from '../saga';
import { makeSelectCategory, makeSelectCategoryLoading } from '../selectors';

const key = 'blogPage';

const CategoryListingPage = (props) => {
  useInjectSaga({ key, saga });
  useEffect(() => {
    props.loadCategoryRequest();
  }, []);
  return (
    <div className="flex items-center h-full">
      {props.category.map((each) => (
        <div key={each._id} className="pr-8">
          <Link
            className="block py-3 no-underline text-gray-700 hover:text-black whitespace-nowrap text-lg"
            to={`/blog/category/${each.slug_url}`}
          >
            {each.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

CategoryListingPage.propTypes = {
  category: PropTypes.array.isRequired,
  loadCategoryRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  loading: makeSelectCategoryLoading(),
});

const mapDispatchToProps = {
  loadCategoryRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryListingPage);
