import React from "react";
import Entry from "./components/Entry";
import emojipedia from "./emojipedia";
import Atropos from 'atropos/react';


function createEntry(emojiTerm) {
  return (
    <Atropos
        className='atropos--container'
        activeOffset={50}
        shadowScale={1.05}
        onEnter={()=>console.log("Entered")}
        onLeave={()=>console.log("Left")}
        onRotate={(x,y)=>console.log(x,y)}
        key={emojiTerm.id}
      >
    <Entry
      key={emojiTerm.id}
      emoji={emojiTerm.emoji}
      name={emojiTerm.name}
      description={emojiTerm.meaning}
    />
    </Atropos>
  );
}

function App() {
  return (
    <div>
      <Atropos
      activeOffset={40}
      shadowScale={1.05}
      >
      <h1 data-atropos-offset="5">
        <span data-atropos-offset="-2" >emojipedia</span>
      </h1>
      </Atropos>
      <dl className="dictionary">{emojipedia.map(createEntry)}</dl>
    </div>
  );
}

export default App;