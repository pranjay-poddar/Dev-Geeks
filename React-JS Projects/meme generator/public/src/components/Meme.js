import React from "react"
import memesData from "../memesData"

export default function Meme() {
    const [memeImage, setMemeImage] = React.useState(memesData.data.memes[8].url)
    const [Toptext, setTopText] = React.useState("Hi");
    const [Bottomtext, setBottomText] = React.useState("Bye");

    function handleChangeTop(event) {
        setTopText(event.target.value);
    }
    function handleChangeBottom(event) {
        setBottomText(event.target.value);
    }
    function getMemeImage(event) {
        const memeArray = memesData.data.memes;
        const randomNumber = Math.floor(Math.random() * memeArray.length);
        console.log(memeArray[randomNumber].url)
        setMemeImage(() => memeArray[randomNumber].url)
        // memeimage = memeArray[randomNumber].url
        // console.log("meme clicked");
        event.preventDefault();
    }
    return (
        <main>
            <form className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChangeTop}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChangeBottom}
                />
                <button onClick={getMemeImage} className="form--button"> Get a new meme image </button>
                <div className="change">
                <div className="meme">
                    <img className="meme--image" src={memeImage}></img>
                    <div className="meme--text top">{Toptext}</div>
                    <div className="meme--text bottom">{Bottomtext}</div>
                </div>
                </div>
            </form>
        </main>
    )
}