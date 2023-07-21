import React from "react";
import { Link } from "react-router-dom";
import "./moviedesc.css";
export default function Moviedesc(props){
return(<>
<div className="maindiv">
  <img src={props.imag}/>
  <div>
    <h2>{props.title}</h2>
  <p><span dangerouslySetInnerHTML={{ __html: props.detail }} ></span></p>
  <a href={props.page}>More</a>
 </div>
</div>
</>);
};