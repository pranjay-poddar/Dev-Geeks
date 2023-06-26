import React from "react";
import '../App.css';

const Navbar=()=>{

    return(
        <>
          <nav class="navbar navbar-expand-lg bg-dark" id="nav">
            <div class="container-fluid">
                <a class="navbar-brand text-light" href="#main">Taxi-Booking</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <a class="nav-link active text-light" aria-current="page" href="#main">Home</a>
                            </li>
                           
                            
                        </ul>
                
                 </div>
            </div>
          </nav>
        </>

    );
}

export default Navbar;