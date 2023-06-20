import React from "react";

//controls the functionality of the header section of the project
export default function Header() {
  return (
    <header className="header">
      <img
        src="https://i.ibb.co/wzwkdsm/Troll-Face-Meme-PNG.webp"
        alt=" "
        className="header--image"
      />
      <h2 className="header--title">Meme Generator</h2>
      <h4 className="header--project">Memer Guru</h4>
    </header>
  );
}
