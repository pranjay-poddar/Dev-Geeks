/**
 *
 * EditorFileSelect
 *
 */

import qs from 'query-string';
import { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import FileList from './components/FileList';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll } from './selectors';
import './style.css';

const key = 'editorFileSelect';

export const EditorFileSelect = ({
  loadFilesRequest,
  selectFile,
  uploadMultiple,
}) => {
  const { search } = useLocation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const queryObj = qs.parse(search);

  useEffect(() => {
    loadFilesRequest({ path: queryObj.path });
  }, [queryObj.path]);

  return (
    <>
      <FileList
        queryObj={queryObj}
        selectFile={selectFile}
        uploadMultiple={uploadMultiple}
      />
      <div className="mt-2 text-xs select-none">
        Note: Please double click to open folder and select images.
      </div>
    </>
  );
};

EditorFileSelect.defaultProps = {
  selectFile: false,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EditorFileSelect);
