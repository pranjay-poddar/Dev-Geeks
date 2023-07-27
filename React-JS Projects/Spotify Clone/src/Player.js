import React from "react";
import Footer from "./Footer";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";

function Player({ spotify }) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body spotify={spotify} />
      </div>
      <Footer spotify={spotify} />
    </div>
  );
}

export default Player;
