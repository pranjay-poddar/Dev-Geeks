import React from 'react'

function Footer() {
    return (
        <div className="mt-5 container-fluid bg-primary bg-gradient text-white " style={{ minHeight: '12rem' }}>
            <div className="row pt-4 text-center ">
                {/* Create 3 section each of 4 col in lg and md device */}
                <div className='col-lg-4 col-md-4 col-sm-12 '>
                    <h5>Quick Links</h5>
                    <div className="d-flex flex-column justify-content-between mb-2 " >
                        <a href="/about" className="text-white p-1">About us</a>
                        <a href="/posts" className="text-white p-1">Our Posts</a>
                        {/* <a href="/about" className="text-white p-1">Our Team</a> */}
                        <a href="/contact" className="text-white p-1">Contact us</a>
                    </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 '>
                    <h5>Newsletter</h5>
                    <div style={{ minHeight: "6rem" }} className="d-flex flex-column justify-content-between mb-2" >
                        <input type='text' className='form-control' placeholder="Subscribe to The newsletter" />
                        <button className='btn btn-warning'>Subscribe</button>
                    </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 '>
                    <h5>Contact Address</h5>
                    <div style={{ minHeight: "6rem" }} className="d-flex flex-column justify-content-between mb-2">
                        <p><i className="px-1 fa-solid fa-location-arrow"></i>
                            25/B Bleecker Street</p>
                        <p>New York</p>
                        <p>States</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Footer