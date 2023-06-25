import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Label from './components/Label';
import Timer from './components/Timer';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState([sessionLength, 0]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const interval = useRef(null);

  const decrementSessionTime = () => {
    if (time[1] === 0) {
      if (time[0] === 0) {
        document.getElementById('beep').play();
        if (isSession) {
          setIsSession(false);
          setIsBreak(true);
          setTime([breakLength, 0]);
          return;
        }
        if (isBreak) {
          setIsBreak(false);
          setIsSession(true);
          setTime([sessionLength, 0]);
          return;
        }
      }
      setTime([time[0] - 1, 59]);
      return;
    } else {
      setTime([time[0], time[1] - 1]);
    }
  };

  const run = () => {
    setIsRunning(!isRunning);
  };
  const reset = () => {
    setIsReset(true);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  };
  const handleClickPlus = (e) => {
    if (isRunning) return;
    if (e.target.id === 'break-increment') {
      breakLength < 60
        ? setBreakLength(breakLength + 1)
        : setBreakLength(breakLength);
    } else {
      sessionLength < 60
        ? setSessionLength(sessionLength + 1)
        : setSessionLength(sessionLength);
    }
  };

  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(() => {
        decrementSessionTime();
      }, 1000);
    } else if (!isRunning && sessionLength !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval.current);
  }, [isRunning, time, sessionLength, breakLength]);

  useEffect(() => {
    if (isReset) {
      setBreakLength(5);
      setSessionLength(25);
      setTime([25, 0]);
      setIsRunning(false);
      setIsSession(true);
      setIsBreak(false);
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (isSession) {
      setTime([sessionLength, 0]);
    }
  }, [sessionLength]);

  useEffect(() => {
    if (isBreak) {
      setTime([breakLength, 0]);
    }
  }, [breakLength]);

  const handleClickMin = (e) => {
    if (isRunning) return;
    if (e.target.id === 'break-decrement') {
      breakLength > 1
        ? setBreakLength(breakLength - 1)
        : setBreakLength(breakLength);
    } else {
      sessionLength > 1
        ? setSessionLength(sessionLength - 1)
        : setSessionLength(sessionLength);
    }
  };

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="session">
        <Label
          className="label"
          increment="break-increment"
          decrement="break-decrement"
          idLength="break-length"
          time={breakLength}
          id="break-label"
          title="Break Length"
          handleClickPlus={handleClickPlus}
          handleClickMin={handleClickMin}
        />
        <Label
          className="label"
          increment="session-increment"
          decrement="session-decrement"
          idLength="session-length"
          time={sessionLength}
          id="session-label"
          title="Session Length"
          handleClickPlus={handleClickPlus}
          handleClickMin={handleClickMin}
        />
      </div>
      <Timer
        isBreak={isBreak}
        time={time}
        run={run}
        isRunning={isRunning}
        reset={reset}
      />
    </div>
  );
}

export default App;
