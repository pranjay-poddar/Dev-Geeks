import React from 'react'

function Contact() {
    return (
        <>
            <section className='contact' id='contact'>
                <h1 className='heading'> <span>Contact</span> us</h1>
                <div className='row'>
                    <iframe
                        class="map"
                        src="https://maps.google.com/maps?q=Butibori&t=&z=10&ie=UTF8&iwloc=&output=embed"
                        allowFullScreen=""
                        loading='lazy' >
                    </iframe>
                    <form>
                        <h3>Get in <span>Touch</span></h3>
                        <div className='input-box'>
                            <span className='fas fa-user'></span>
                            <input type='text' placeholder='name'></input>
                        </div>
                        <div className='input-box'>
                            <span className='fas fa-envelope'></span>
                            <input type='email' placeholder='email'></input>
                        </div>
                        <div className='input-box'>
                            <span className='fas fa-phone'></span>
                            <input type='number' placeholder='number'></input>
                        </div>
                        <input type='submit' value="contact now" className='btn'></input>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Contact