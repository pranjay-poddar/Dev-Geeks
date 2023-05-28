import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
  SetCurrentTime,
  SetIsPlaying,
} from "../redux/userSlice";
import SongsList from "./SongsList";

function Player() {
  const [volume, setVolume] = useState(0.5);
  const [shuffleOn, setShuffleOn] = useState(false);
  const dispatch = useDispatch();
  const audioRef = React.createRef();
  const { currentSong, currentSongIndex, allSongs, isPlaying, currentTime } =
    useSelector((state) => state.user);

  const onPlay = () => {
    audioRef.current.play();
    dispatch(SetIsPlaying(true));
  };

  const onPause = () => {
    audioRef.current.pause();
    dispatch(SetIsPlaying(false));
  };

  const onPrev = () => {
    if (currentSongIndex !== 0 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex - 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
    } else {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(SetCurrentSong(allSongs[randomIndex]));
    }
  };
  const onNext = () => {
    if (currentSongIndex !== allSongs.length - 1 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex + 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
    } else {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(SetCurrentSong(allSongs[randomIndex]));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong && allSongs.length > 0) {
      dispatch(SetCurrentSong(allSongs[0]));
    }
  }, [allSongs]);

  useEffect(() => {
    if (currentTime) {
      audioRef.current.currentTime = currentTime;
    }
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-5 shadow-lg bg-white">
      <div className="flex justify-between items-center border p-5 border-green-500 rounded shadow-xl">
        <div className="flex items-center gap-2 w-96">
          <img
            className="h-20 w-32"
            src="https://freepngimg.com/thumb/music/24394-5-music-photos.png"
            alt=""
          />
          <div>
            <h1 className="text-active text-2xl">{currentSong?.title}</h1>
            <h1 className="text-secondary">
              {currentSong?.artist} , {currentSong?.album} , {currentSong?.year}
            </h1>
          </div>
        </div>

        <div className="w-96 flex flex-col items-center">
          <audio
            src={currentSong?.src}
            ref={audioRef}
            onTimeUpdate={(e) => {
              dispatch(SetCurrentTime(e.target.currentTime));
            }}
          ></audio>
          <div className="flex gap-10 items-center">
            <i class="ri-skip-back-line text-4xl text-gray-500" onClick={onPrev}></i>

            {isPlaying ? (
              <i className="ri-pause-line text-4xl text-white bg-gray-500 rounded-2xl p-1" onClick={onPause}></i>
            ) : (
              <i className="ri-play-line text-4xl text-white bg-gray-500 rounded-2xl p-1" onClick={onPlay}></i>
            )}

            <i class="ri-skip-forward-line text-4xl text-gray-500" onClick={onNext}></i>
          </div>
          <div className="flex gap-3 items-center w-full">
            <i
              className={`ri-shuffle-line text-xl ${shuffleOn && "text-orange-500 font-semibold"
                }`}
              onClick={() => {
                setShuffleOn(!shuffleOn);
              }}
            ></i>
            <h1>
              {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
            </h1>
            <input
              type="range"
              className="p-0 w-full"
              min={0}
              max={Number(currentSong?.duration) * 60}
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                dispatch(SetCurrentTime(e.target.value));
              }}
            />
            <h1>{currentSong?.duration}</h1>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <i
            className="ri-volume-mute-line text-3xl text-gray-500"
            onClick={() => {
              setVolume(0);
              audioRef.current.volume = 0;
            }}
          ></i>
          <input
            type="range"
            className="p-0"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => {
              audioRef.current.volume = e.target.value;
              setVolume(e.target.value);
            }}
          />
          <i
            className="ri-volume-down-line text-3xl text-gray-500"
            onClick={() => {
              setVolume(1);
              audioRef.current.volume = 1;
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Player;
