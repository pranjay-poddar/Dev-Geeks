import React from "react";
import Git from "../components/Git";
import Terminal from "../components/Terminal";
import Win from "../components/Win";
import "../styles/Home.css";
import logoLight from "../assets/logolight.png";
import logoDark from "../assets/logodark.png";
import { useState, createContext, useCallback } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { TerminalContextProvider } from "react-terminal";
import HeroSection from "../components/HeroSection";

export const DarkContext = createContext(null);

function Home({ appCallback, setIsModalOpen, username, password }) {
  const [darkMode, setDarkMode] = useState(true);
  const [isPushedHome, setIsPushedHome] = useState();

  useCallback(() => {
    appCallback(isPushedHome, darkMode);
  }, [isPushedHome, appCallback, darkMode]);

  const callback = (pushedvalue) => {
    setIsPushedHome(pushedvalue);
  };

  return (
    <>
      <div className="containerhome" id={!darkMode ? "" : "dark"}>
        <nav className="mainnav" id={!darkMode ? "" : "darknav"}>
          <img
            src={!darkMode ? logoLight : logoDark}
            alt="Site Logo"
            height="40px"
          />
          <DarkModeToggle
            className="toggle"
            onChange={() => {
              !darkMode ? setDarkMode(true) : setDarkMode(false);
            }}
            checked={darkMode}
            size={50}
            speed={2.9}
          />
        </nav>
        <HeroSection darkMode={darkMode} />
        <DarkContext.Provider value={{ darkMode, setDarkMode }}>
          <div className="home" id={!darkMode ? "" : "homelight"}>
            <div className="lefthome">
              <div className="textcontainer">
                <div
                  className="instructions"
                  id={!darkMode ? "instructions-light" : ""}
                >
                  Your username for GitHub is{" "}
                  <code className="code">{username}</code> and the extremely
                  secret password to that is{" "}
                  <code className="code">{password}</code>(remember this, it'll
                  come in handy later). Make sure you type/copy each command
                  EXACTLY as it is, punctuations and everything. Let's go!
                  <br />
                  <br />
                  The very first command you'll wanna execute is{" "}
                  <code className="code">pwd</code> to check the present working
                  directory. If it returns{" "}
                  <code>"current path: /C/Users/Desktop/"</code>, run{" "}
                  <code className="code">cd gitgood</code>. This will make sure
                  you're in the gitgood folder. Once inside, you may run{" "}
                  <code className="code">ls</code> to see all the files and
                  folders listed.
                  <br />
                  <br />
                  Now go ahead and run <code className="code">git init</code>
                  <br />
                  This command initializes an empty Git repositry in the current
                  folder.
                  <br />
                  <br />
                  Next, run <code className="code">git add .</code>
                  <br />
                  This command stages the files to be pushed in the newly
                  initialized empty git repository.
                  <br />
                  <br />
                  Next, run <code className="code">git status</code>
                  <br />
                  This command lets you see all the files staged for pushing.
                  <br />
                  <br />
                  Now that you've checked all the files staged for pushing, go
                  ahead and commit the changes with{" "}
                  <code className="code">git commit -m 'first commit'</code>
                  <br />
                  <br />
                  Next, run{" "}
                  <code className="code" id="wrap">
                    git remote add origin
                    'https://github.com/griffinStewie69/gitgood-repo.git'
                  </code>
                  <br />
                  This command lets the GitHub servers know exactly which
                  repository you're pushing the files to.
                  <br />
                  <br />
                  All that's left now is to actually push the files. Run{" "}
                  <code className="code">git push -u origin master</code>
                  <br />
                  At this point, to make sure you are the owner/creator of the
                  repository you're trying to push to, GitHub will ask for your
                  username and password.
                  <br />
                  <br />
                  See? That wasn't so scary now, was it? Congratulations on
                  making your "first commit" to GitHub through the cli. As an
                  exercise, go check out the official{" "}
                  <a
                    target="_blank"
                    href="https://git-scm.com/doc"
                    rel="noreferrer"
                  >
                    git documentation
                  </a>{" "}
                  (10/10 would recommend) and find out what the -m and -u flags
                  do. While you're at it, explore and read up on the rest of the
                  commands. There are a lot more git commands used everyday by
                  professional devs all around the world!
                  <br />
                  Note: In order for this to work on your system, you'll need
                  git bash installed. Git bash can be downloaded from{" "}
                  <a
                    href="https://git-scm.com/downloads"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>
                  .
                </div>
              </div>
            </div>
            <div className="righthome">
              <div className="git-win-container">
                <Git isPushedHome={isPushedHome} username={username} />
                <Win />
              </div>
              <TerminalContextProvider>
                <Terminal
                  className="terminal"
                  callback={callback}
                  setIsModalOpen={setIsModalOpen}
                  username={username}
                />
              </TerminalContextProvider>
            </div>
          </div>
        </DarkContext.Provider>
      </div>
    </>
  );
}

export default Home;
