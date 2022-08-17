import React from "react";
import "../styles/HeroSection.css";
import Spline from "@splinetool/react-spline";

function HeroSection({ darkMode }) {
  return (
    <div className="hero-main">
      <div className="hero-container">
        <div className="hero-right">
          <Spline
            className="spline"
            // style={{ width: "600px", height: "500px" }}
            scene="https://prod.spline.design/m-pzmi-J3lv1z8vn/scene.splinecode"
          />
        </div>
        <div className="hero-left" id={!darkMode ? "" : "heroleftdark"}>
          <h1 id={!darkMode ? "" : "headingdark"}>
            Learn to use git, interactively!
          </h1>
          <p>
            There are a lot of different ways to use Git. There are the original
            command-line tools, and there are many graphical user interfaces of
            varying capabilities. For this tutorial, we will be using Git on the
            command line. Using the command line (scary as it may be) is the
            industry standard for version control and collaborating on projects.
            That's why I made this. It'll help you get started with the git cli.
            You'll see how easy it is, right from{" "}
            <code className={darkMode ? "yellow" : "green"}>git init</code> to{" "}
            <code className={darkMode ? "yellow" : "green"}>git push</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
