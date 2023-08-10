
import React from 'react';
import { menu } from './Data';

function Menu() {
    return (
        <>
            <section className='menu' id='menu'>
                <h1 className='heading'>Our <span>Menu</span></h1>
                <div className='box-container'>
                    {
                        menu.map((item, index) => (
                            <div className='box'>
                                <img src={item.img} alt='' />
                                <h3>Tasty and Healthy</h3>
                                <div className='price'>$15.99 /- <span>$20.99</span>
                                </div><br></br>
                                <a className='btn'>Add to cart</a>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default Menu