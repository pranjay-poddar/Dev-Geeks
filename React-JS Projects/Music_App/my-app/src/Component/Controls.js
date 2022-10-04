
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward,faPause,faForward,faPlay} from '@fortawesome/free-solid-svg-icons';
 

function Controls(props){
  return(
  <div className="c-player--controls">
  <button className="skip-btn" onClick={() => props.skipSong(false)}>
    <FontAwesomeIcon icon={faBackward} />
  </button>
  <button
    className="play-btn"
    onClick={() => props.setIsPlaying(!props.isPlaying)}
  >
    <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
  </button>
  <button className="skip-btn" onClick={() => props.skipSong()}>
    <FontAwesomeIcon icon={faForward} />
  </button>
</div>
  )
}
export default Controls;