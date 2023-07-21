import React from 'react';
//import './aboutus.css';

const Aboutus = () => {
    return (
        <div className="aboutus" id="about">
            <h1 className="abouttitle">About Us</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nulla id sapien tempus, iaculis quam condimentum, venenatis nibh. 
                Fusce sed accumsan leo. Aliquam ut diam purus. Nulla facilisi. 
                Donec blandit est ac tempus feugiat. 
                Curabitur vitae felis non libero vulputate feugiat in et velit. 
            </p>
            <img src="image/food1.jpg" alt="food1" height="400px" />
            <img src="image/food2.jpg" alt="food2" height="400px" />
        </div>
    )
}

export default Aboutus;