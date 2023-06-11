import beep from '../assets/BeepSound.wav';

function Timer(props) {
  const formateTime = () => {
    let time = '';
    if (props.time[0] >= 10) {
      time += props.time[0];
    } else {
      time += '0' + props.time[0];
    }
    time += ':';
    if (props.time[1] >= 10) {
      time += props.time[1];
    } else {
      time += '0' + props.time[1];
    }
    return time;
  };
  return (
    <div
      id="timer-label"
      className={`timer ${props.time[0] === 0 ? 'bd-danger' : ''}`}
    >
      <p>{props.isBreak ? 'Break' : 'Session'}</p>
      <p id="time-left">{formateTime()}</p>
      <button id="start_stop" onClick={props.run}>
        {props.isRunning ? 'Stop' : 'Start'}
      </button>
      <button id="reset" onClick={props.reset}>
        Reset
      </button>

      <audio id="beep" src={beep} />
    </div>
  );
}

export default Timer;
