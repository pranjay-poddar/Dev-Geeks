import React, { useState } from "react";
import "./Banner.css";
import { Button } from "@mui/material";
import Search from "./Search.js";
import {useNavigate} from "react-router-dom";


function Banner() {
	const navigate = useNavigate();
	const [showSearch, setShowSearch] = useState(false);
	return (
		<div className="banner">
			<div className="banner__search">
				{/* Search component is for date picker on clicking the search date btn */}
				{showSearch && <Search />}
				<Button
					onClick={() => setShowSearch(!showSearch)}
					className="banner__searchButton"
				>
					{showSearch ? "Hide": "Search Dates"}
				</Button>
			</div>
			<div className="banner__info">
				<h1>Get out and stretch your imagination</h1>
				<h5>
					Plan a different kind of getaway to uncover the hidden gems near you.
				</h5>
				<Button onClick={() => navigate('/search')}>Explore Nearby</Button>
			</div>
		</div>
	);
}

export default Banner;
