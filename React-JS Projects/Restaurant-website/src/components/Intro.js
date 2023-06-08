import React from 'react';
//import './intro.css';

const Intro = () => {
    return (
        <div className="intro">
            <div className="intrologo">
                <img src="image/resto.jpg" alt="resto" width="100%" />
                <div className="text">
                    <h1 style={{fontSize: "300%"}}>The Rice Bowl</h1>
                    <p>Best Taste in the town!</p>
                </div>
            </div>
        </div>
    )
}

export default Intro;