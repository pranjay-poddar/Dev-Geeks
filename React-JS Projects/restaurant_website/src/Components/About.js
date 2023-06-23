import React from 'react'
import aboutImg from '../images/139203-food-plate-top-nutrition-view.png'

function About() {
    return (
        <>
            <section className='about' id='about'>
                <h1 className='heading'>
                    <span>About</span> us
                </h1>
                <div className='about-row'>
                    <div className='image'>
                        <img src={aboutImg} alt='' />
                    </div>
                    <div className='content'>
                        <h3>Come for the best meal in town</h3>
                        <p>This restaurant chain made famous for its gourmet burgers makes it easy for customers to find a chain nearby. Prominent calls-to-action include “Get a Gift Card” as well as easy access to social media accounts. </p>
                        <p> A slideshow featuring the current specials dominates the page, giving customers a sense of what’s in store for them.</p><br></br>
                        <a href='#' className='btn'>Know more</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About
