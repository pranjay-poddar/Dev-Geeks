import React from "react";

function Entry(props) {
  return (
    <div className="term" data-atropos-offset="5" >
      <div data-atropos-offset="-2">
      <dt >
        <span className="emoji" data-atropos-offset="3" role="img" aria-label="Tense Biceps">
          {props.emoji}
        </span>
        <span>{props.name}</span>
      </dt>
      <dd >{props.description}</dd>
      </div>
    </div>
  );
}

export default Entry;
