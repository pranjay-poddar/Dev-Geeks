import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { loadArchivesRequest } from '../actions';
import { makeSelectArchiveLoading, makeSelectArchives } from '../selectors';
import ArchiveSkeleton from '../Skeleton/Archive';

function Archives(props) {
  const { loading, archives, loadArchive } = props;

  useEffect(() => {
    archives.length === 0 && loadArchive();
  }, []);

  return loading ? (
    <ArchiveSkeleton />
  ) : (
    <>
      <div className="my-4 border border-gray-300 rounded p-4 bg-white shadow">
        <h3 className="text-xl uppercase oswald">Archives</h3>
        <div className="pt-4">
          {archives &&
            archives.map((each) =>
              each != null ? (
                <div
                  key={`recents-${each}`}
                  className="border-b border-gray-300 insetShadowBottom"
                >
                  <Link
                    className="block py-3 no-underline text-gray-700 hover:text-black"
                    to={`/blog/date/${moment(each).format('YYYY-MM')}`}
                  >
                    <time>{moment(each).format('MMMM YYYY')}</time>
                  </Link>
                </div>
              ) : (
                ''
              ),
            )}
        </div>
      </div>
    </>
  );
}

Archives.propTypes = {
  loading: PropTypes.bool.isRequired,
  archives: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  archives: makeSelectArchives(),
  loading: makeSelectArchiveLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadArchive: (payload) => dispatch(loadArchivesRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Archives);
