import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./slider.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

const breakPoints = [
    { width: 1, itemsToShow: 1 ,itemsToScroll:1},
    { width: 550, itemsToShow: 2 ,itemsToScroll:1},
    { width: 768, itemsToShow: 3 ,itemsToScroll:1},
    { width: 1200, itemsToShow: 4 ,itemsToScroll:1},
  ];

export default function Slider(props){
    const [mydat,setMyDat]=useState([])
    useEffect(()=>{
        axios.get("https://api.tvmaze.com/shows")
        .then((res)=>setMyDat(res.data));
      },[]);
      var i=1;
    return(
<>
      <div className="slider">
        <h1>{props.type}</h1>
        <Carousel breakPoints={breakPoints}>

            {mydat.map(dat=>{
                const{score , show}=dat;
                if(dat.genres[0]==props.type || dat.genres[1]==props.type || dat.genres[2]==props.type){
                return <Item title={dat.name} key={dat.id} imag={dat.image.medium} eve={i++} keys={dat.id} detail={dat.summary}/>
                }
            })}
        </Carousel>
      </div>
    </>
    );
}