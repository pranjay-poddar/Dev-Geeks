import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setVideoUrl } from "../redux/videoAction";

import "./style/VideoLayer.css";
function VideoPlayer() {
  const videoUrl = useSelector((state) => state.videoUrl);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  // console.log(videoUrl)
  const videoCollection = useSelector((state)=>state.videoCollectionUrl)
  console.log('----------------')
  
  console.log(videoCollection);
  console.log('----------------')
  const [videoNumber,setVideoNumber] = useState(0);
  useEffect(() => {
    

    const handleKeyDown = (event) => {
      switch (event.code) {
        case "ArrowLeft":
          // Forward 10 seconds
          videoRef.current.currentTime -= 10;
          break;
        case "ArrowRight":
          // Backward 10 seconds
          videoRef.current.currentTime += 10;
          break;
        case "ArrowUp":
          // Increase volume
          if (videoRef.current.volume < 1) {
            videoRef.current.volume += 0.1;
          }
          break;
        case "ArrowDown":
          // Decrease volume
          if (videoRef.current.volume > 0) {
            videoRef.current.volume -= 0.1;
          }
          break;
        case "Space":
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
          break;
        case "KeyK":
          // Play/Pause
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
          break;
        case "KeyF":
          // Toggle fullscreen
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            videoRef.current.requestFullscreen();
          }
          break;
        case 'KeyN':
         
              setVideoNumber(videoNumber + 1);
              dispatch(setVideoUrl( URL.createObjectURL(videoCollection[videoNumber])))
              break;
        case 'KeyP':
           
           setVideoNumber(videoNumber - 1);
            dispatch(setVideoUrl( URL.createObjectURL(videoCollection[videoNumber])))
            break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {videoUrl ? (
        <div className="videoPlayer">
          <video ref={videoRef} className="" src={videoUrl} controls />
        </div>
      ) : (
        null
      )}
    </>
  );
}

export default VideoPlayer;
