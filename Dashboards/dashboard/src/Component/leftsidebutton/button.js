import React from "react";
import './button.css'



const Addbutton=(props)=>{
return( <React.Fragment>
    <div className="design">
    <div className="sizebutton">
      
      <div className="rectangle"></div> 
      <div className="text">{props.name}</div>
      
    </div>
    </div>
</React.Fragment>)
}

export default Addbutton;