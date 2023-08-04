import { useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { loadContentRequest } from '../../containers/App/actions';
import { IMAGE_BASE } from '../../containers/App/constants';
import {
  makeSelectContent,
  makeSelectUserIsAdmin,
} from '../../containers/App/selectors';
import './module.css';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import saga from '../../containers/App/saga';
import reducer from '../../containers/App/reducer';

const StaticContent = (props) => {
  const { contentObj, isAdmin, loadContent, contentKey } = props;
  useInjectReducer({ key: 'global', reducer: reducer });
  useInjectSaga({ key: 'global', saga: saga });
  useEffect(() => {
    if (contentObj[contentKey]) {
      return;
    }
    loadContent(contentKey);
  }, [contentObj, loadContent, contentKey]);

  if (!contentObj[contentKey]) {
    return null; // maybe add a loader here
  }
  return (
    <>
      {/* should be super admin */}
      {isAdmin &&
        contentObj &&
        contentObj.ids &&
        contentObj.ids[contentKey] &&
        (contentObj &&
        contentObj.is_page &&
        contentObj.is_page[contentKey] === false ? (
          <Link
            to={`/admin/section-content/edit/${contentObj.ids[contentKey]}`}
            target="_blank"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-white shadow rounded-full absolute text-gray-600 hover:text-primary">
              <FaPen className="text-sm" title="Edit" />
            </div>
          </Link>
        ) : (
          <Link
            to={`/admin/page-content/edit/${contentObj.ids[contentKey]}`}
            target="_blank"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-white shadow rounded-full absolute text-gray-600 hover:text-primary">
              <FaPen className="text-sm" title="Edit" />
            </div>
          </Link>
        ))}

      {contentObj &&
        contentObj.image &&
        contentObj.image[contentKey] &&
        contentObj.image[contentKey].path && (
          <div>
            <img src={`${IMAGE_BASE}${contentObj.image[contentKey].path}`} />
          </div>
        )}
      <div
        className="ckEditor"
        dangerouslySetInnerHTML={{
          __html: contentObj[contentKey],
        }}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  contentObj: makeSelectContent(),
  isAdmin: makeSelectUserIsAdmin(),
});

const mapDispatchToProps = {
  loadContent: loadContentRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(StaticContent);
