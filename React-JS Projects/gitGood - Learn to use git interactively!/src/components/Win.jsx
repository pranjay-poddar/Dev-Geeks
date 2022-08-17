import React, { useContext } from "react";
import { DarkContext } from "../pages/Home.jsx";
import "../styles/Win.css";
import Folder from "../assets/folderwin.ico";
import Cross from "../assets/Cross.png";
import VSCode from "../assets/vscode.png";
import Chrome from "../assets/chrome.png";
import Start from "../assets/start.png";
import Search from "../assets/search.ico";
import Explorer from "../assets/explorer.ico";

function Win() {
  const { darkMode } = useContext(DarkContext);

  return (
    <>
      <div className="wincontainer" id={!darkMode ? "winlight" : ""}>
        <div className="topbar" id={!darkMode ? "toplight" : ""}>
          <div className="foldername">
            <img src={Folder} alt="folder icon" width="12px" height="auto" />
            <p>gitgood</p>
          </div>
          <img src={Cross} alt="Cross icon" width="7px" />
        </div>
        <div className="content" id={!darkMode ? "contentlight" : ""}>
          <div className="aftertop">
            <img src={Folder} alt="folder icon" width="10px" />
            <p>{">"}</p>
            <p>gitgood</p>
          </div>
          <div
            className="contentfiles"
            id={!darkMode ? "contentfileslight" : ""}
          >
            <div className="fileeach">
              <img src={Folder} alt="assets folder" width="30px" />
              <p>assets</p>
            </div>
            <div className="fileeach">
              <img src={Chrome} alt="assets folder" width="30px" />
              <p>index</p>
            </div>
            <div className="fileeach">
              <img src={VSCode} alt="assets folder" width="30px" />
              <p>style</p>
            </div>
            <div className="fileeach">
              <img src={VSCode} alt="assets folder" width="30px" />
              <p>script</p>
            </div>
          </div>
        </div>
        <div className="taskbar" id={!darkMode ? "taskbarlight" : ""}>
          <img src={Start} alt="start button" width="10px" />
          <img src={Search} alt="search button" width="10px" />
          <img src={Explorer} alt="explorer button" width="10px" />
          <img src={VSCode} alt="vs code button" width="10px" />
          <img src={Chrome} alt="chrome button" width="10px" />
        </div>
      </div>
    </>
  );
}

export default Win;
