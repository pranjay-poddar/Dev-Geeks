import React, {useEffect, createContext, useReducer, useContext, useState} from 'react';
import { API_BASE_URL } from '../config/constant'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../App';

import axios from 'axios'
function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch } = useContext(UserContext);




    const signup = (event) => {
        event.prevantDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const reqData = {
            email: email,
            phone: phone,
            password: password

        }


        axios.post(`${API_BASE_URL}/users`, reqData, config)
            .then((response) => {

                // Fetch the deatils of autheticated user, in our case assume uderid1 is authrnticated

                const userId = 1;

                fetch(`${API_BASE_URL}/users/${userId}`)
                    .then((response) => response.json())
                    .then((json) => {
                        localStorage.clear();
                        const token = localStorage.getItem('token');
                        

                        localStorage.setItem('user', JSON.stringify(json))
                        localStorage.setItem('token', 'jhgjhgfdfdsa')
                        dispatch({ type: 'LOGIN', payload: userState });
                        const user = localStorage.getItem('user');
                        const userState = { 'token': token, 'user': user };

                        navigate('/posts');
                    });
                // Assure user has successfully autheticated
            })
            .catch((err) => {

                console.log(err)
            });

    }

    return (
        <div>
            <div>
                <div className="container" >
                    <h3 className="text-center text-uppercase pt-4">Login</h3>
                    <div className="mx-auto conatct-form-conatiner shadow-sm rounded p-3 lh-1 text-muted">
                        <form onSubmit={(e) => signup(e)}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" required>Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="email" />
                            </div>





                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="email" />

                            </div>



                            <div className='d-grid'>
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </div>
                        </form>
                    </div >
                </div >
            </div>
        </div>
    )
}

export default Login