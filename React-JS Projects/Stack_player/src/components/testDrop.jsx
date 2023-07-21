import React, { useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { setVideoCollection } from '../redux/videoAction';

import './style/drop-file-input.css';

import uploadImg from '../assets/cloud-upload-regular-240.png';
import ListFile from './ListFile';

const DropFileInput = (props) => {
  const [actionSelector, setActionSelector] = useState(true);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = (e) => {
    const newFiles = e.target.files;
    if (newFiles.length > 0) {
      const videoFiles = Array.from(newFiles).filter(file => file.type.startsWith('video/'));
      const updatedList = [...fileList, ...videoFiles];
      setFileList(updatedList);
      dispatch(setVideoCollection(updatedList));
    //   props.onFileChange(updatedList);
    }
  };

  const handleSelectorAction = () => {
    setActionSelector(!actionSelector);
  };

  const NewSelector = ({ classNameAsProp }) => (
    <div onClick={() => setActionSelector(false)}>
      <div
        ref={wrapperRef}
        className={`drop-file-input ${!actionSelector ? classNameAsProp : ''}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" multiple onChange={onFileDrop} />
      </div>
    </div>
  );

  const fileRemove = (file) => {
    const updatedList = fileList.filter((item) => item !== file);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      {fileList.length > 0 ? (
        <>
          <div className="listFile">
            <ListFile fileList={fileList} fileRemove={fileRemove} />
          </div>
          <div className="newSelector">
            <button className="newSelector-btn" onClick={handleSelectorAction}>
              {actionSelector ? 'Open' : 'Close'}
            </button>
          </div>
          {!actionSelector && (
            <div className="selectorPanel">
              <NewSelector classNameAsProp="actionSelector" />
            </div>
          )}
        </>
      ) : (
        <NewSelector classNameAsProp="" />
      )}
    </>
  );
};

// DropFileInput.propTypes = {
//   onFileChange: PropTypes.func.isRequired,
// };

export default DropFileInput;
