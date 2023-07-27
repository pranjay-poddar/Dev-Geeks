import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setVideoUrl, setVideoIndex } from "../redux/videoAction";

import "./style/VideoLayer.css";
function VideoPlayer() {
  const [newVideo,setNewVideo] = useState(false);
  // const [counter,setCounter] = useState(1);
  const videoUrl = useSelector((state) => state.videoUrl);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const videoCollection = useSelector((state) => state.videoCollectionUrl);
  const videoNumber = useSelector((state) => state.videoNumber);

  // const [videoNumber,setVideoNumber] = useState(0);
  useEffect(() => {
    const nextVideo = () => {
      console.log(videoNumber);
      if (videoNumber < videoCollection.length - 1) {
        dispatch(setVideoIndex(videoNumber + 1));
        dispatch(setVideoUrl(videoCollection[videoNumber + 1].url));
      } else {
        dispatch(setVideoIndex(0));
        dispatch(setVideoUrl(videoCollection[0].url));
      }
    };
    
    try {
      if (videoRef.current.ended()) {

       
          setNewVideo(true);
          nextVideo();
          // clearInterval(interval);
      }
    } catch (error) {
        console.log('Video is not selected')
    }

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
        case "KeyN":
          nextVideo();

          // console.log(videoIndex)

          break;
        case "KeyP":
          if (videoNumber > 0) {
            dispatch(setVideoIndex(videoNumber - 1));
            dispatch(setVideoUrl(videoCollection[videoNumber - 1].url));
          }

          break;
        default:
          break;
      }

      // dispatch(setVideoUrl(videoCollection[videoNumber].url))
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoNumber, videoCollection]);
  // console.log(videoNumber);
  return (
    <>
      {videoUrl ? (
        <div className="videoPlayer">
          {newVideo?<div> <h1 style={{color:'gray'}}>Playing Next Video.... </h1></div>:<video ref={videoRef} className="" src={videoUrl} controls autoPlay />}
          <br />
          <div>
            <h2 style={{ color: "#333", fontSize: "18px" }}>
              {videoCollection[videoNumber].name.split(".")[0]}
            </h2>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default VideoPlayer;
