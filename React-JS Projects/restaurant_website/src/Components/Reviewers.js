import React from 'react';
import { clients } from './Data';
import qouteImg from '../images/qoute.png'

function Reviewers() {
    return (
        <>
            <section className='reviews' id='reviews'>
                <h1 className='heading'>Customer's <span>Review</span></h1>
                <div className='box-container'>
                    {
                        clients.map((item, indes) => (
                            <div className='box'>
                                <img src={qouteImg} alt='' className='qoute' />
                                <p >A slideshow featuring the current specials dominates the page, giving customers a sense of what’s in store for them.</p>
                                <img src={item.img} alt='' className='user' />
                                <h3>{item.name}</h3>
                                <div className='stars'>
                                    <i className='fas fa-star' />
                                    <i className='fas fa-star' />
                                    <i className='fas fa-star' />
                                    <i className='fas fa-star' />
                                    <i className='fas fa-star-half-alt' />
                                </div>
                            </div>
                        ))
                    }
                </div>
               
            </section>
        </>
    )
}

export default Reviewers