import Player from  './Component/Player';
import { useState,useEffect } from "react";


function App() {
  const [songs]=useState([

    {
        title: "Titaliya",
        artist: "Hardy Sandhu",
        img_src: "./images/titaliya.jpg",
        src: "./music/Titliaan Warga.mp3",
      },
      {
        title: "Nach Meri Rani",
        artist: "Yo Yo Honey Singh",
        img_src: "./images/nach-meri-rani.jpg",
        src: "./music/Naach Meri Rani.mp3",
      },
      {
        title: "Care Ni Karda",
        artist: "Yo Yo Honey Singh",
        img_src: "./images/care-ni-karda.jpg",
        src: "./music/Care Ni Karda.mp3",
      },
      {
        title: "Burj Khalifa",
        artist: "Shashi",
        img_src: "./images/burjkalifa.jpg",
        src: "./music/BurjKhalifa.mp3",
      },
      {
        title: "Tango Del Fuego",
        artist: "Parov Stelar",
        img_src: "./images/ParovStelarGeorgiaGibbs-TangoDelFuego.jpg",
        src: "./music/ParovStelarGeorgiaGibbs-TangoDelFuego.mp3",
      },
      {
        title: "Take You Dancing",
        artist: "Jason Derulo",
        img_src: "./images/JasonDerulo-TakeYouDancing.jpg",
        src: "./music/JasonDerulo-TakeYouDancing.mp3",
      },
      {
        title: "Daisy",
        artist: "Ashnikko",
        img_src: "./images/Ashnikko-Daisy.jpg",
        src: "./music/Ashnikko-Daisy.mp3",
      },
      {
        title: "Dolly Song",
        artist: "Partz Grimbad",
        img_src: "./images/PatzGrimbard-DollySong.jpg",
        src: "./music/PatzGrimbard-DollySong.mp3",
      },
    ]);
  
    const[currentSongIndex,setCurrentSongIndex]=useState(0);
    const[nextSongIndex,setNextSongIndex]=useState(0);

    useEffect(() => {
      setNextSongIndex(() => {
        if (currentSongIndex + 1 > songs.length - 1) {
          return 0;
        } else {
          return currentSongIndex + 1;
        }
      });
    }, [currentSongIndex, songs.length]);
  return (
    <div className="App">
     
     <Player
     currentSongIndex={currentSongIndex}
     setCurrentSongIndex={setCurrentSongIndex}
     nextSongIndex={nextSongIndex}
     songs={songs}
      />
      {/* <p>code by :- Rishika Vishnoi</p> */}
    </div>
    
  );
}

export default App;
