import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { getTokenFromResponse } from "./spotify";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [{ playlists }, dispatch] = useStateValue();
  console.log(playlists);

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SidebarOption Icon={HomeIcon} option="Home" />
      <SidebarOption Icon={SearchIcon} option="Search" />
      <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption option={playlist.name} />
      ))}
    </div>
  );
}

export default Sidebar;
