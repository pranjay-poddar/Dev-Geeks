import React, { useState } from "react";
import '../App.css';

const Main1 = ()=>{

    const [formData,setFormData] =useState(

        {

            name:"",
            phone:"",
            pickup:"",
            dropoff:"",
            date:"",
            time:"",
            message:""
        }
    )

    const[showAlert,setShowAlert]=useState(false);
    const [isDateValid, setIsDateValid] = useState(false);
    const[isTimeValid,setIsTimeValid] = useState(false);

    const handleSubmit =(event)=>{

        event.preventDefault()  //preventing the refresh behaviour
        handleDate();
        handleTime();

    }

    const handleChange = (event)=>{

       setFormData(prevData =>{

        return{
            ...prevData,
            [event.target.name]:event.target.value
        }
       })

    }
   
    const validateData = (dateString) => {
        const inputDate = new Date(dateString);
        //console.log(dateString);
        const today = new Date();
        //console.log(today);
      
        // Check if the input date is valid\
        //console.log(inputDate.getTime())
        if (isNaN(inputDate.getTime())) {
          return false;
        }
      
        // Check if the input date is before today
        if (inputDate < today.setHours(0,0,0,0)) {
          return false;
        }
      
        return true;
      };

    
      
    const handleDate =()=>{
        
        const dateValidation = validateData(formData.date);

        if (dateValidation === false) {

          setShowAlert(false);
          setIsDateValid(true);
        } else {
          setShowAlert(true);
          setIsDateValid(false);
          return true;
        }


    }

    const validateTime = (dateString, timeString) => {
        const inputDate = new Date(`${dateString}T${timeString}`);
        const currentDate = new Date();
      
        if (inputDate < currentDate) {
          return "error";
        } else if (inputDate.getDate() === currentDate.getDate()) {
          const inputTime = inputDate.getTime();
          const currentTime = currentDate.getTime();
          if (inputTime < currentTime) {
            return "error";
          }
        }
      
        return "success";
      };
      
      const handleTime = () => {
        const dateValidation = validateTime(formData.date, formData.time);
      
        if (dateValidation === "error") {
          setShowAlert(false);
          setIsTimeValid(true);
        } else {
          setShowAlert(true);
          setIsTimeValid(false);
          return true;
        }
      };
      
    return( 
    <>
        {showAlert && (
            
            <div class="alert alert-primary alert-dismissible " role="alert">
               <strong> <span>&#10003;</span> Congratulations !! You have sucessfully booked your Ticket</strong>
               <p>Details:<br/>
               <b>Travel Date:</b> &nbsp; <b>{formData.date}</b><br/>
               <b>travel  Time:</b> &nbsp; <b>{formData.time}</b><br/>
               <b>Pickup Location:</b> &nbsp; <b>{formData.pickup}</b><br/>
               <b>Drop Location:</b> &nbsp; <b>{formData.dropoff}</b><br/>
               </p> 
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          
          )}
           
           {isDateValid && (
            
            <div class="alert alert-danger alert-dismissible " role="alert">
               <strong> <span>&#10003;</span> Enter a valid Date</strong>
               
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          
          )}
        {isTimeValid && (
            
            <div class="alert alert-danger alert-dismissible " role="alert">
               <strong> <span>&#10003;</span> Enter a valid Time</strong>
               
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          
          )}
        
     
        <form  id="my-form" onSubmit={handleSubmit}>
           
             <div className="main" >
             
                    <div className="book">
                    <h2>Book-My-Ticket

                    </h2>
                           <div className="first">
                                <div>
                                    <label for="name">Name: </label>
                                    <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} autoComplete="off" required></input>
                                </div>
                                
                                <div>
                                    <label for="mobile">Mobile: </label>
                                    <input type="tel" id="phone" name="phone" onChange={handleChange} value={formData.phone} autoComplete="off" required/>
                                </div>
                            </div>
                            <div className="first">

                                <div>
                                    <label for="pick-up">Pickup-Location</label>
                                    <input type="text" id="pickup" name="pickup" onChange={handleChange} value={formData.pickup} autoComplete="off" required/>

                                </div>

                                <div>
                                
                                    <label for="pick-up">Dropoff-Location</label>
                                    <input type="text" id="dropoff" name="dropoff" onChange={handleChange} value={formData.dropoff} autoComplete="off" required/>
                                </div>
                            
                            </div>
                            <div className="first">

                              <div>
                                    <label for="date">Select a Date:</label>
                                    <input type="date" id="date" name="date" onChange={handleChange} value={formData.date} autoComplete="off" required/>
                              </div>
                            
                              <div>
                                    <label for="time">Select a time: </label>
                                    <input type="time" id="time" name="time" onChange={handleChange} value={formData.time} autoComplete="off" required/>
                              </div>

                            </div>
                            <div className="second">
                                <label for="message">Message: </label>  
                                <textarea id="message" name="message" rows={4} cols={50} onChange={handleChange} value={formData.message}></textarea>  
                            </div>
                            
                            <br/>
                            <center>
                              <input type="submit" value="Book-A-Ticket" id="submit"/>  
                            </center>
                          
                    </div>      
             </div>

          </form>
    </>
         
    );
}

export default Main1;