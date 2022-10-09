import React, { useState } from 'react'
import { API_BASE_URL } from '../config/constant'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

function Signup() {
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");


    function alertFunction(message, type) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        var alertPlaceholder = document.getElementById('AlertMessage')
        alertPlaceholder.append(wrapper)
    }




    const signup = (event) => {
        event.prevantDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const reqData = {
            name: fname + ' ' + lname + ' ',
            email: email,
            phone: phone,
            password: password

        }


        axios.post(`${API_BASE_URL}/users`, reqData, config)
            .then((response) => {
                alertFunction('Registration Successfully. Please Proceed to login', 'success')

                setEmail("");
                setFname("");
                setLname("");
                setPhone("");
                setPassword("");

            })
            .catch((err) => {
                alertFunction('Error Occured', 'danger')

                console.log(err)
            });

    }

    return (
        <div>
            <div className="container" >
                <h3 className="text-center text-uppercase pt-4">Create an Account</h3>
                <div className="mx-auto conatct-form-conatiner shadow-sm rounded p-3 lh-1 text-muted">
                    <div id="AlertMessage"></div>

                    <form onSubmit={(ev) => signup(ev)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" required>First Name</label>
                            <input value={fname} onChange={(e) => setFname(e.target.value)} type="text" className="form-control" id="firstname" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" required>Last Name</label>
                            <input value={lname} type="text" onChange={(e) => setLname(e.target.value)} className="form-control" id="lastname" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Contact Number</label>
                            <input value={phone} type="text" onChange={(e) => setPhone(e.target.value)} className="form-control" id="contact-number" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" className="form-control" id="Email" />
                            <div id="emailHelp"  className="form-control">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />

                        </div>


                        <div className='d-grid'>
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>

                    </form>
                </div >
            </div >
        </div>
    )
}

export default Signup