import React from "react";
import "./Header.css";
import { useStateValue } from "./StateProvider";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";

function Header({ spotify }) {
  const [{ user }, dispatch] = useStateValue();

  if (!user) {
    return null; // or render a placeholder/header without user info
  }

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts"
          type="text"
        />
      </div>
      <div className="header__right">
        {user.images && user.images[0] && user.images[0].url && (
          <Avatar alt={user.display_name} src={user.images[0].url} />
        )}
        <h4>{user.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
