import Details from "./Details";
import Controls from "./Controls";
import { useEffect, useRef, useState } from "react";

function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const skipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  return (
    <div className="c-player">
      <h4>Playing Now </h4>
      <Details song={props.songs[props.currentSongIndex]} />
      <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} skipSong={skipSong}/>

      <audio className="player_audio" src={props.songs[props.currentSongIndex].src} ref={audioEl} controls></audio>
      <p>
        Next Up: <span>{props.songs[props.nextSongIndex].title} by  {" "}
         {props.songs[props.nextSongIndex].artist}`
        </span>
      </p>
    </div>
  );
}
export default Player;
