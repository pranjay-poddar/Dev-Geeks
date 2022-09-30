import React, { useContext } from "react";
import "../styles/Git.css";
import { DarkContext } from "../pages/Home.jsx";
// import { PushedContext } from "./Terminal";
// import { pushed } from "./Terminal";
import {
  LogoGithubIcon,
  MarkGithubIcon,
  RepoIcon,
  FileIcon,
  GitBranchIcon,
  FileDirectoryFillIcon,
  TagIcon,
} from "@primer/octicons-react";

function Git({ isPushedHome, username }) {
  const size = 16;
  const { darkMode } = useContext(DarkContext);
  // const { isPushed, commitMessage } = useContext(PushedContext);
  return (
    <>
      {/* <PushedContext.Consumer> */}
      <div className="gitcontainer" id={!darkMode ? "gitlight" : ""}>
        <nav className="gitnav">
          <MarkGithubIcon className="childnav" size={size} fill="white" />
          <LogoGithubIcon className="childnav" size={size} fill="white" />
        </nav>
        <div className="gitafternav" id={!darkMode ? "afternavlight" : ""}>
          <RepoIcon className="childafternav" size={size} fill="gray" />
          <h6 className="childafternav underline">{username} / gitgood-repo</h6>
          <p className="childafternav">Public</p>
        </div>
        <div>
          <div className="branches" id={!darkMode ? "brancheslight" : ""}>
            <div className="currentbranch flexi">
              <GitBranchIcon size={12} fill="gray" />
              <h6>master</h6>
            </div>
            <div className="numberbranch flexi underline">
              <GitBranchIcon size={12} fill={!darkMode ? "black" : "white"} />
              <h6>1</h6>
              <p>branch</p>
            </div>
            <div className="numberbranch flexi underline">
              <TagIcon size={12} fill={!darkMode ? "black" : "white"} />
              <h6>0</h6>
              <p>tags</p>
            </div>
          </div>
        </div>
        <div
          className="codecontainer"
          id={!darkMode ? "codecontainerlight" : ""}
        >
          <div className="userinfo" id={!darkMode ? "userinfolight" : ""}>
            <h6 className="underline">{username}</h6>
          </div>
          <div className="list-main" id={isPushedHome ? "listpushed" : ""}>
            <li className="dotremove" id={!darkMode ? "lilight" : ""}>
              <div className="spacebetween">
                <FileDirectoryFillIcon
                  size={12}
                  fill={!darkMode ? "black" : "#8A949F"}
                />
                <p className="underline blue margin">assets</p>
              </div>
              <p>first commit</p>
            </li>
            <li className="dotremove" id={!darkMode ? "lilight" : ""}>
              <div className="spacebetween">
                <FileIcon size={12} fill={!darkMode ? "black" : "#8A949F"} />
                <p className="underline blue margin">index.html</p>
              </div>
              <p>first commit</p>
            </li>
            <li className="dotremove" id={!darkMode ? "lilight" : ""}>
              <div className="spacebetween">
                <FileIcon size={12} fill={!darkMode ? "black" : "#8A949F"} />
                <p className="underline blue margin">script.js</p>
              </div>
              <p>first commit</p>
            </li>
            <li className="dotremove" id={!darkMode ? "lilight" : ""}>
              <div className="spacebetween">
                <FileIcon size={12} fill={!darkMode ? "black" : "#8A949F"} />
                <p className="underline blue margin">style.css</p>
              </div>
              <p>first commit</p>
            </li>
          </div>
        </div>
      </div>
      {/* </PushedContext.Consumer> */}
    </>
  );
}

export default Git;
