import React from "react";
import Terminal from "terminal-in-react";
import "../styles/TerminalMobile.css";
import { SocialIcon } from "react-social-icons";

function TerminalMobile({ darkMode }) {
  const commands = {
    "help(gitgood)": () => {
      return (
        <>
          <span>Help on module gitgood:</span>
          <br />
          <br />
          <span style={{ marginLeft: "25px" }}>
            <strong>gg.dev</strong> --{">"} Meet the person behind this website.
          </span>
          <br />
          <br />
          <span style={{ marginLeft: "25px" }}>
            <strong>gg.resources</strong> --{">"} More resources on git and its
            usage.
          </span>
          <br />
        </>
      );
    },
    "gg.dev": () => {
      return (
        <>
          <br />
          <span>
            <SocialIcon
              url="https://twitter.com/zaidsidd360"
              style={{ height: "30px", width: "30px", marginLeft: "10px" }}
              target="_blank"
            />
            <SocialIcon
              url="https://www.linkedin.com/in/zaidsidd69420/"
              style={{ height: "30px", width: "30px", marginLeft: "10px" }}
              target="_blank"
            />
            <SocialIcon
              url="https://github.com/zaidsidd360"
              style={{ height: "30px", width: "30px", marginLeft: "10px" }}
              target="_blank"
              bgColor={darkMode ? "white" : "black"}
            />
            <SocialIcon
              url="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=zaidsidd360@gmail.com&su"
              network="email"
              style={{ height: "30px", width: "30px", marginLeft: "10px" }}
              target="_blank"
              bgColor={darkMode ? "white" : "black"}
            />
          </span>
          <br />
        </>
      );
    },
    "gg.resources": () => {
      return (
        <>
          <br />
          1.{" "}
          <a
            href="https://training.github.com/downloads/github-git-cheat-sheet.pdf"
            style={{ color: "orange" }}
          >
            Git CheatSheet.
          </a>
          <br />
          <br />
          2.{" "}
          <a
            href="https://www.freecodecamp.org/news/the-beginners-guide-to-git-github/"
            style={{ color: "orange" }}
          >
            Beginner's guide to git and GitHub by FCC.
          </a>
          <br />
          <br />
          3.{" "}
          <a
            href="https://www.freecodecamp.org/news/the-beginners-guide-to-git-github/"
            style={{ color: "orange" }}
          >
            Thorough git tutorial by Atlassian.
          </a>
          <br />
          <br />
          4.{" "}
          <a
            href="https://rogerdudler.github.io/git-guide/"
            style={{ color: "orange" }}
          >
            git - the simple tutorial.
          </a>
          <br />
        </>
      );
    },
  };

  return (
    <>
      <div className="termobile">
        <div className="topbar" id={darkMode ? "topdark" : ""}>
          <div className="topbarContent">
            <div className="red butn"></div>
            <div className="yellow butn"></div>
            <div className="green butn"></div>
          </div>
        </div>
        <Terminal
          commands={commands}
          backgroundColor={darkMode ? "#28292B" : "#E9E9E9"}
          allowTabs={false}
          prompt={darkMode ? "lightblue" : "blue"}
          promptSymbol="~$"
          color={darkMode ? "white" : "black"}
          hideTopBar={true}
          style={{
            fontSize: "0.9em",
            borderBottomRightRadius: "7px",
            borderBottomLeftRadius: "7px",
            height: "200px",
            width: "100%",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "4px 4px 10px #1d1c1c",
            maxWidth: "90vw",
          }}
        />
      </div>
    </>
  );
}

export default TerminalMobile;
