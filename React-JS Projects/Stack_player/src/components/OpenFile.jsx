import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setVideoUrl } from "../redux/videoAction";

function OpenFile() {
  const dispatch = useDispatch();
  const fileTag = useRef();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    dispatch(setVideoUrl(url));
  };
  const GetFile = ()=>{
    fileTag.current.click();
  }
  return (
    <div className="openFile">
    <button className="FileCss" onClick={GetFile}>Select Video</button>
      <input
        ref={fileTag}
        type="file"
        accept="video/*"
        
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default OpenFile;
