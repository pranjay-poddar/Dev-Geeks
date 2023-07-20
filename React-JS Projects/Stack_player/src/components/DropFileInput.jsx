import React, { useRef, useState ,useEffect} from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setVideoCollection, setVideoUrl } from '../redux/videoAction';

import './style/drop-file-input.css';

import uploadImg from '../assets/cloud-upload-regular-240.png';
import ListFile from './ListFile';

const DropFileInput = (props) => {
  const [actionSelector, setActionSelector] = useState(true);
  const [altmsg,setAltmsg] = useState('');
  const wrapperRef = useRef(null);
  const newRefBtn = useRef(null);
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const videoIndex = useSelector((state)=>state.videoNumber);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.code === "KeyO" ) {
        newRefBtn.current.click();
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  


  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');
  const onFileDrop = (e) => {
    
    const newFiles = e.target.files;
    if (newFiles.length > 0) {
      const videoFiles = Array.from(newFiles).filter(file => file.type.startsWith('video/'));
      const updatedList = [...fileList, ...videoFiles].map(file => ({
        name: file.name,
        size: file.size,
        type:file.type,
        url: URL.createObjectURL(file)
      }));
      setFileList(updatedList);
  
      // if(fileList.length <= 250){
      // }else{
      //   setAltmsg(`File limit exceeded`);
      // }
      updatedList.sort();
      dispatch(setVideoCollection(updatedList));
      dispatch(setVideoUrl(updatedList[videoIndex].url))
    }
    setAltmsg(`At a time you can only upload 250 files`);

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
            <button className="newSelector-btn" ref={newRefBtn} onClick={handleSelectorAction}>
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
