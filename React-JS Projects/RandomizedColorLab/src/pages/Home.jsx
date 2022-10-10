import React, { useCallback, useEffect, useState } from "react";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaInfo } from "react-icons/fa";

const Home = () => {
  const numberOfColors = 6;
  const defaultHexCodeArray = new Array(numberOfColors).fill("#7a7877");
  const [hexcode, setHexcode] = useState(defaultHexCodeArray);
  const [num, setnum] = useState(0);
  const [isWin, setIsWin] = useState(null);
  const [endColor, setendColor] = useState("");
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);

  const resetRandomised = useCallback(() => {
    const newArray = new Array(numberOfColors);
    for (let idx = 0; idx < hexcode.length; idx++) {
      newArray[idx] = `#${Math.floor(Math.random() * 16777000).toString(16)}`;
    }
    setHexcode(newArray);
    setIsToastDisplayed(true);
    setnum(Math.floor(Math.random() * 6));
    setIsWin(null);
  }, [hexcode.length]);

  useEffect(() => {
    const listener = window.addEventListener("keydown", (e) => {
      if (e.key === " ") resetRandomised();
    });
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [resetRandomised]);

  const resetGame = () => {
    setIsWin(null);
    setHexcode(defaultHexCodeArray);
    setendColor("");
  };

  const checkColor = (hex) => {
    if (hex === hexcode[num]) {
      const filledArray = new Array(hexcode.length).fill(hex);

      setendColor(hex);
      setIsWin(true);

      if (isToastDisplayed) {
        setIsToastDisplayed(false);
        toast("You win");
      }
      setHexcode(filledArray);
    } else {
      setIsWin(false);
      toast("You Loose ");
    }
  };

  const copyColorToClipboard = (endColor) => {
    navigator.clipboard.writeText(endColor);
  };

  return (
    <div className="home">
      <h1 id="headline">
        <p className="clickText">
          {isWin == null
            ? "Click the button below OR Press <Spacebar> & "
            : isWin
            ? "You Win"
            : "You lose"}
        </p>
        <p className="infoText">{`Generate NEW ${
          hexcode[num] !== "#7a7877" ? hexcode[num] : "Hex"
        } Colors`}</p>
      </h1>
      <div id="stripe">
        <button id="btn1" onClick={() => resetRandomised()}>
          <img
            src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-click-call-to-action-bearicons-glyph-bearicons.png"
            alt="clickme"
            id="clickimg"
          />
          Random Color
          <FaInfo
            className="help-icon"
            title="Click the color that matches the hex code."
          />
        </button>
        <p id="endbutton" onClick={() => resetGame()}>
          {isWin && <button id="endbtn">end game?</button>}
        </p>
      </div>
      <div id="container">
        <div className="row">
          {/* map is an array function which maps each value */}
          {hexcode.map((hex, i) => (
            <div className="row-child" key={i}>
              <div
                className="square"
                style={{ backgroundColor: `${hex}` }}
                onClick={() => checkColor(hex)}
              >
                <span>
                  {isWin && (
                    <button
                      className="btn"
                      onClick={() => copyColorToClipboard(endColor)}
                      style={{
                        backgroundColor: isWin === true ? `${endColor}` : "",
                      }}
                    >
                      Copy Color
                    </button>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer autoClose={800} hideProgressBar={true} />
    </div>
  );
};

export default Home;
