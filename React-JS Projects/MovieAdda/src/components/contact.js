import React from "react";
import "../App.css";

export default function Contact(){
    return(<>
    <div className="container1" style={{color:"white"}}>
  <form action="mailto:recipient@example.com" method="post" enctype="text/plain">
    <label for="fname">First Name</label>
    <input type="text" id="fname" name="firstname" for="fname" placeholder="Your name.." style={{marginBottom:"20px"}}/>

    <label for="lname">Last Name</label>
    <input type="text" id="lname" name="lastname" for="lname" placeholder="Your last name.." style={{marginBottom:"20px"}}/>

    <label for="message">Message</label><br/>
    <textarea id="message" name="message" for="message" placeholder="Write something.." style={{height:"100px" , width:"100%" , marginBottom:"20px"}}></textarea><br/>

    <input type="submit" style={{backgroundColor:"rgb(206, 27, 27)" , color:"white"  , margin:"auto"}} value="Submit"/>
  </form>
</div>
    </>);
}