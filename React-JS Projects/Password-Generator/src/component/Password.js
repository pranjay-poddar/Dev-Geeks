

import React, { useState } from 'react'

export default function Password(props) {
    const [poss,setPoss]=useState("");
    const [nums,setNum]=useState(1);
    const [char,setChar]=useState("9");
    const Generate=()=>{
        if(poss===""){
            // setPoss("");
              let vari="";
              // let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
              for(let i=0;i<nums;i++){
                vari+=char.charAt(Math.floor(Math.random()*char.length));
              }
               
               setPoss(vari);
            //    console.log({poss});
            //    console.log(vari);
        }
        // else{
        //     setPoss("");
        // }
      
           else if(poss!==""){
                // setPoss("");
                let vari="";
              // let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
              for(let i=0;i<nums;i++){
                vari+=char.charAt(Math.floor(Math.random()*char.length));
              }
               
               setPoss(vari);
        //        console.log({poss});
        //        console.log(vari);

            }
        

    }
   const textreset=()=>{
    setPoss("");
   
    }
  return (
    <>
   
    <div   className=" sumit" style={{backgroundColor:props.color==='light'?'white':'black'}} >
     <ul style={{listStyle:'none'}}> 
     <li>
     <select className="form-control-sm ">
  <option onClick={() => setNum(1)}>1</option>
  <option onClick={() => setNum(2)}>2</option>
  <option onClick={() => setNum(3)}>3</option>
  <option onClick={() => setNum(4)}>4</option>
  <option onClick={() => setNum(5)}>5</option>
  <option onClick={() => setNum(6)}>6</option>
  <option onClick={() => setNum(7)}>7</option>
  <option onClick={() => setNum(8)}>8</option>
  <option onClick={() => setNum(9)}>9</option>
  <option onClick={() => setNum(10)}>10</option>
  <option onClick={() => setNum(11)}>11</option>
  <option onClick={() => setNum(12)}>12</option>
  <option onClick={() => setNum(13)}>13</option>
  <option onClick={() => setNum(14)}>14</option>
  <option onClick={() => setNum(15)}>15</option>
</select>
     
     <select className="form-control-sm mx-5">
  
  <option onClick={() => setChar("0123456789")}>Digit</option>
  <option onClick={() => setChar("ABCDabcdefghijklmnopqrstucvwxyzEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")}>Alphabet</option>
  <option onClick={() => setChar('ABCDEFGHIJabcdef???$%@$$ghijklmnopqrstuvwxyzKLMNOP$$$##&&QRSTUVWXYZabcdefghijklmn?????&&&&%%%opqrstuvwxyz0123456789.?$#@')}>Mixed</option>
</select>
     </li>
        <li>
               <h3>Click to generate Password</h3> 
        </li>
    
    <li className="my-1-d-flex p-5">
      <button className="btn btn-outline-success my-3 my-sm-0" type="submit" onClick={Generate}>Click </button>
      </li>

      <li>
     
{/*   
      <div className="group" style={{border:props.color==='light'?'4px solid black':'4px solid white'}}> */}
      <div className="group">
      <p> {poss}</p>
      <ul style={{listStyle:'none' ,justifyContent:'flex-end'}}>
        <li>
        
        
  <button  className="btn btn-outline-danger butn" type="submit" onClick={textreset}>Reset</button>
            </li></ul>   
  </div>
  
    
   

      </li>
      </ul>

    </div>
    </>
  )
}
