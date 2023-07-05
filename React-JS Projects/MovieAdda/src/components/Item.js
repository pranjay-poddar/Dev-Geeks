import React from "react";
import {Link} from "react-router-dom";
import "./item.css";
export default function Item(props){
return(<>
{/* <div className="card" style={{width: "18rem",height:"26rem"}}>
  <img className="card-img-top" src={props.imag} alt="Card image cap" style={{height:"10rem"}}/>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text mt-0"><span dangerouslySetInnerHTML={{ __html: props.detail.slice(0,150)+" ..." }} ></span></p>
    <Link to={`/Moviedesc${props.eve}`} className="btn btn-primary">Read More</Link>
  </div>
</div> */}
<div class="contain" style={{backgroundImage:`url(${props.imag})`}}>
  <div className="contain2">
    <h2><div style={{backgroundColor:"white",color:"red",padding:"4px 30px"}}><span >{props.title}</span></div><hr/></h2>
    <p class="desc"><span dangerouslySetInnerHTML={{ __html: props.detail.slice(0,130)+" ..." }} ></span>
</p>
<p><Link to={`/Moviedesc${props.keys}`} className="button">Read More</Link></p>
	</div>
</div>
</>);
};
