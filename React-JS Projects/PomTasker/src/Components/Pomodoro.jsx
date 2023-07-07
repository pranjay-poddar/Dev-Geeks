import React, { useState, useEffect } from "react";

import buzzerSound from "./buzzer.wav";

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isBuzzing, setIsBuzzing] = useState(false);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const completePomodoro = () => {
    setIsBreak(true);
    setTimeLeft(5 * 60);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setIsBuzzing(true);
      const buzzer = new Audio(buzzerSound);
      buzzer.play();
      setTimeout(() => {
        setIsBuzzing(false);
        buzzer.pause();
        buzzer.currentTime = 0;
        if (isBreak) {
          resetTimer();
        } else {
          completePomodoro();
        }
      }, 2000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="pomodoro-timer bg-gray-700 text-center  w-[20%] py-4 h-36 rounded-3xl absolute">
      <div className="timer-display font-mono text-white font-semibold text-base">
        <h2 className="mb-3">{isBreak ? "Break" : "Pomodoro Timer"}</h2>
        
        <h1 className="mb-3">{formatTime(timeLeft)}</h1>
        
        {!isRunning && (
          <button className="start-button bg-blue-700 rounded-xl p-2 font-mono text-white text-sm hover:bg-blue-900" onClick={startTimer}>
            Start
          </button>
        )}
        {isRunning && (
          <button className="stop-button bg-red-600 rounded-xl p-2 font-mono text-white text-sm mx-2 hover:bg-red-800" onClick={stopTimer}>
            Stop
          </button>
        )}
        <button className="reset-button bg-green-600 rounded-xl font-mono text-white text-sm p-2 mx-2 hover:bg-green-800" onClick={resetTimer}>
          Reset
        </button>
      </div>
      {isBuzzing}
    </div>
  );
}

export default PomodoroTimer;