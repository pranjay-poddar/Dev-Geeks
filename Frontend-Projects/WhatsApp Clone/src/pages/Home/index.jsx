import React from "react";
import "./styles/main.css";
import Icon from "components/Icon";
import introImgLight from "assets/images/intro-connection-light.jpg";
import introImgDark from "assets/images/intro-connection-dark.jpg";

const Home = () => {
	const darkTheme = document.body.classList.contains("dark-theme");

	return (
		<div className="home">
			<div className="home__img-wrapper">
				<img
					src={darkTheme ? introImgDark : introImgLight}
					alt=""
					className="home__img"
				/>
			</div>

			<h1 className="home__title"> Keep your phone connected </h1>
			<p className="home__text">
				Alpha Messsenger connects to your phone to sync messages. To reduce data usage,
				connect your phone to Wi-Fi.
			</p>
			<p className="home__text">
				<Icon id="laptop" className="home__icon" />
				<span>
					Alpha Messenger is available for Mac or Windows.{" "}
					
					
				</span>
			</p>
		</div>
	);
};

export default Home;
