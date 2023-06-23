import React from "react";
import axios from 'axios';
import { useEffect,useState } from 'react';
import "./poster.css";
export default function Poster(){
    const [mydat,setMyDat]=useState([])
    useEffect(()=>{
        axios.get("https://api.tvmaze.com/shows")
        .then((res)=>setMyDat(res.data));
      },[]);
    return(<>
	<div className="post">
        <div className="post1">
		<h1>True Detective</h1>
        <a href="http://www.hbo.com/true-detective"><button>WATCH NOW</button></a>
        </div>
        <img src="https://static.tvmaze.com/uploads/images/original_untouched/445/1114021.jpg"></img>
	</div>
    </>);
}