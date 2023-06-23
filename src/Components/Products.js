import React from 'react';
import { products } from './Data';

function Products() {
    return (
        <>
            <section className='products' id='products'>
                <h1 className='heading'>Our <span>Products</span></h1>
                <div className='box-container'>
                    {
                        products.map((item, index) => (
                            <div className='box'>
                                <div className='icon'>
                                    <a href='#' className='fas fa-shopping-cart'></a>
                                    <a href='#' className='fas fa-heart'></a>
                                    <a href='#' className='fas fa-eye'></a>
                                </div>
                                <div className='image'>
                                    <img src={item.img} alt='' />
                                </div>
                                <div className='content'>
                                    <h3> Fresh Products</h3>
                                    <div className='stars'>
                                    <i className='fas fa-star'/>
                                    <i className='fas fa-star'/>
                                    <i className='fas fa-star'/>
                                    <i className='fas fa-star'/>
                                    <i className='fas fa-star-half-alt'/>
                                    </div>
                                    <div className='price'>$15.99/- <span>$20.99</span></div>
                                </div>

                            </div>
                        ))
                    }

                </div>
            </section>
        </>
    )
}

export default Products