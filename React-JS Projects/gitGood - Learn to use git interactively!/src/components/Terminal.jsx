import React, { useContext, useState, useEffect } from "react";
import { ReactTerminal } from "react-terminal";
import "../styles/Terminal.css";
import { DarkContext } from "../pages/Home.jsx";
import { motion } from "framer-motion";
import { RiRefreshLine } from "react-icons/ri";
import { SocialIcon } from "react-social-icons";

function Terminal({ callback, setIsModalOpen, username }) {
  const { darkMode, setDarkMode } = useContext(DarkContext);

  const [isPushed, setIsPushed] = useState(false);

  const [dollar, setDollar] = useState(true);

  let currentDirArr = ["/C", "Users", "Desktop"];

  let lastItem = currentDirArr[currentDirArr.length - 1];

  let gitCmd = "";

  useEffect(() => {
    callback(isPushed);
  }, [callback, isPushed]);

  const commands = {
    pusheed: () => {
      setIsModalOpen(true);
    },
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
          <br />
          <span style={{ marginLeft: "25px" }}>
            <strong>gg.toggletheme()</strong> --{">"} Toggle the website's
            theme.
          </span>
          <br />
        </>
      );
    },
    "gg.dev": (
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
    ),
    "gg.resources": (
      <>
        <br />
        1.{" "}
        <a href="https://training.github.com/downloads/github-git-cheat-sheet.pdf">
          Git CheatSheet.
        </a>
        <br />
        <br />
        2.{" "}
        <a href="https://www.freecodecamp.org/news/the-beginners-guide-to-git-github/">
          Beginner's guide to git and GitHub by FCC.
        </a>
        <br />
        <br />
        3.{" "}
        <a href="https://www.freecodecamp.org/news/the-beginners-guide-to-git-github/">
          Thorough git tutorial by Atlassian.
        </a>
        <br />
        <br />
        4.{" "}
        <a href="https://rogerdudler.github.io/git-guide/">
          git - the simple tutorial.
        </a>
        <br />
      </>
    ),
    "gg.toggletheme()": () => {
      !darkMode ? setDarkMode(true) : setDarkMode(false);
    },
    cd: (directory) => {
      currentDirArr.push(directory);
      lastItem = directory;
      return `new path: ${currentDirArr.join("/") + "/"}`;
    },
    "cd..": () => {
      currentDirArr.pop();
      return `new path: ${currentDirArr.join("/") + "/"}`;
    },
    pwd: () => {
      return `current path: ${currentDirArr.join("/") + "/"}`;
    },
    ls: () => {
      if (currentDirArr[currentDirArr.length - 1] === "Desktop") {
        return (
          <>
            <span>
              Mode&emsp;&emsp;LastWriteTime&emsp;&emsp;&emsp;Name
              <br />
            </span>
            <span>
              ----&emsp;&emsp;-------------&emsp;&emsp;&emsp;----
              <br />
            </span>
            <span>
              d----&emsp;02-07-2022{"  "}18:03&emsp;gitgud
              <br />
            </span>
            <span>
              -a---&emsp;08-02-2022{"  "}18:03&emsp;This PC.lnk
              <br />
            </span>
          </>
        );
      } else if (currentDirArr[currentDirArr.length - 1] === "gitgood") {
        return (
          <>
            <span>
              Mode&emsp;&emsp;LastWriteTime&emsp;&emsp;&emsp;Name
              <br />
            </span>
            <span>
              ----&emsp;&emsp;-------------&emsp;&emsp;&emsp;----
              <br />
            </span>
            <span>
              d----&emsp;03-06-2022{"  "}18:03&emsp;assets
              <br />
            </span>
            <span>
              -a---&emsp;03-06-2022{"  "}18:04&emsp;index.html
              <br />
            </span>
            <span>
              -a---&emsp;03-06-2022{"  "}18:04&emsp;style.css
              <br />
            </span>
            <span>
              -a---&emsp;03-06-2022{"  "}18:04&emsp;script.js
              <br />
            </span>
          </>
        );
      } else if (currentDirArr[currentDirArr.length - 1] === "assets") {
        return (
          <>
            <span>
              Mode&emsp;&emsp;LastWriteTime&emsp;&emsp;&emsp;Name
              <br />
            </span>
            <span>
              ----&emsp;&emsp;-------------&emsp;&emsp;&emsp;----
              <br />
            </span>
            <span>
              -a---&emsp;03-06-2022{"  "}18:03&emsp;logo.svg
              <br />
            </span>
            <span>
              -a---&emsp;03-06-2022{"  "}18:03&emsp;background.png
              <br />
            </span>
            <span>
              -a---&emsp;03-06-2022{"  "}18:03&emsp;aboutBg.png
              <br />
            </span>
          </>
        );
      }
    },
    git: (text) => {
      if (text === "init") {
        if (lastItem === "gitgood" && gitCmd === "") {
          gitCmd = "init";
          return "Initialized empty Git repository in /C/Users/Desktop/gitgood/.git/ ";
        } else if (lastItem !== "gitgood" && gitCmd === "") {
          return (
            <span style={{ color: "red" }}>
              You should execute this command inside the gitgood folder. Use{" "}
              <code style={{ color: "green" }}>cd gitgood</code> to change the
              current path and then run{" "}
              <code style={{ color: "green" }}>git init</code> again.
            </span>
          );
        } else if (lastItem === "gitgood" && gitCmd !== "") {
          return (
            <span style={{ color: "red" }}>
              You can't execute this command again until this session is
              finished!
            </span>
          );
        } else if (isPushed === true) {
          return "You should click on the refresh button and then try again!";
        }
      } else if (text === "add .") {
        if (gitCmd === "init") {
          gitCmd = "add .";
          return "";
        } else {
          return (
            <span style={{ color: "red" }}>
              This command should be executed after{" "}
              <code style={{ color: "green" }}>git init</code>.
            </span>
          );
        }
      } else if (text === "status") {
        if (gitCmd === "add .") {
          gitCmd = "status";
          return (
            <>
              <span>
                On branch master
                <br />
              </span>
              <br />
              <span>
                No commits yet
                <br />
              </span>
              <br />
              <span>
                Changes to be committed:
                <br />
              </span>
              <span style={{ marginLeft: "20px" }}>
                &#12304;Use "git rm --cached &#60;file&#62;..." to
                unstage&#12305;
                <br />
              </span>
              <br />
              <span style={{ color: "green", marginLeft: "45px" }}>
                new file: assets/logo.svg
                <br />
              </span>
              <span style={{ color: "green", marginLeft: "45px" }}>
                new file: assets/background.png
                <br />
              </span>
              <span style={{ color: "green", marginLeft: "45px" }}>
                new file: assets/aboutBg.png
                <br />
              </span>
              <span style={{ color: "green", marginLeft: "45px" }}>
                new file: index.html
                <br />
              </span>
              <span style={{ color: "green", marginLeft: "45px" }}>
                new file: style.css
                <br />
              </span>
              <span style={{ color: "green", marginLeft: "45px" }}>
                new file: script.js
                <br />
              </span>
              <br />
            </>
          );
        } else {
          return (
            <span style={{ color: "red" }}>
              This command should be executed after{" "}
              <code style={{ color: "green" }}>git add .</code>.
            </span>
          );
        }
      } else if (text === "commit -m 'first commit'") {
        if (gitCmd === "status") {
          gitCmd = "commit";
          return (
            <>
              <span>
                &#91;master &#12304;root-commit&#12305; 1fc80a3&#93; first
                commit
                <br />
              </span>
              <span style={{ marginLeft: "10px" }}>
                8 files changed, 69420 insertions&#12304;+&#12305;
                <br />
              </span>
              <span style={{ marginLeft: "10px" }}>
                create mode 100644 assets/logo.svg
                <br />
              </span>
              <span style={{ marginLeft: "10px" }}>
                create mode 100644 assets/background.png
                <br />
              </span>
              <span style={{ marginLeft: "10px" }}>
                create mode 100644 assets/aboutBg.png
                <br />
              </span>
              <span style={{ marginLeft: "10px" }}>
                create mode 100644 index.html
                <br />
              </span>
              <span style={{ marginLeft: "10px" }}>
                create mode 100644 style.css
                <br />
              </span>
              <span style={{ marginLeft: "10px" }}>
                create mode 100644 script.js
                <br />
              </span>
            </>
          );
        } else {
          return (
            <span style={{ color: "red" }}>
              This command should be executed after{" "}
              <code style={{ color: "green" }}>git status</code>.
            </span>
          );
        }
      } else if (
        text ===
        "remote add origin 'https://github.com/griffinStewie69/gitgood-repo.git'"
      ) {
        if (gitCmd === "commit") {
          gitCmd = "remote";
          return (
            <span>
              <br />
            </span>
          );
        } else if (gitCmd !== "commit") {
          return (
            <span>
              This command should be executed after{" "}
              <code style={{ color: "green" }}>
                git commit -m 'your-message'
              </code>
              .
            </span>
          );
        }
      } else if (text === "push -u origin master") {
        if (gitCmd === "remote") {
          gitCmd = "push";
          setDollar(false);
          return "";
        } else {
          return (
            <span style={{ color: "red" }}>
              This command should be executed after{" "}
              <code style={{ color: "green" }}>
                git remote add origin 'your-URL'
              </code>
              .
            </span>
          );
        }
      }
    },
    griffinStewie69: () => {
      if (!dollar && username === "griffinStewie69") {
        setDollar(true);
        setIsPushed(true);
        setIsModalOpen(true);
        return (
          <>
            <br />
            <br />
            <br />
            <span>
              Congratulations! Your code is pushed to GitHub successfully. Click
              on the refresh button at the top right of this terminal
              &#12304;and run <code style={{ color: "green" }}>clear</code>
              &#12305; to practice again.
            </span>
          </>
        );
      } else {
        return <span style={{ color: "red" }}>Username doesn't exist!</span>;
      }
    },
  };

  let welcomeMsg = (
    <span>
      {" "}
      Type "help(gitgood)" for more information.
      <br />
    </span>
  );

  return (
    <>
      <div className="terminal-all">
        {isPushed ? (
          <div
            className="refresh"
            onClick={() => {
              setIsPushed(false);
              gitCmd = "";
            }}
          >
            <RiRefreshLine />
          </div>
        ) : null}
        <motion.div
          className="termcontainer"
          id={!darkMode ? "" : "termdark"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            duration: 0.8,
          }}
        >
          <ReactTerminal
            commands={commands}
            prompt={dollar ? "~$" : "username for 'https://github.com':"}
            theme={!darkMode ? "material-light" : "material-dark"}
            errorMessage={"ERR: unidentified command"}
            welcomeMessage={welcomeMsg}
          />
        </motion.div>
      </div>
    </>
  );
}

export default Terminal;
