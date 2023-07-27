import React from "react";
import OpenFile from "./OpenFile";
import "./style/Home.css";
import VideoPlayer from "./VideoPlayer";
import DragAndDrop from "./DragAndDrop";
import Navbar from "./Navbar";
function Home() {
  return (
    <div className="app-home">
      <div className="videoLayer">
        <Navbar/>
        <VideoPlayer />
      </div>
      <div>
        
      </div>
      <div className="centerContent">
        <DragAndDrop />
      </div>
    </div>
  );
}

export default Home;
