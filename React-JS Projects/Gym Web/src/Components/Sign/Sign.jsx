import React from 'react'
import { useState } from 'react'
import './Sign.css'
const Sign = () => {
    const [signIn, toggle] = useState(true);
    return (
        <div>
            <div className="Container">
                <div className="SignUpContainer" signIn={signIn}>
                    <form className="Form">
                        <h1 className='Title'>Create Account</h1>
                        <input type={'text'} placeholder='Name' />
                        <input type={'email'} placeholder='Email' />
                        <input type={'password'} placeholder='Password' />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="SignInContainer" signIn={signIn}>
                    <form className="Form">
                        <h1 className='Title'>Sign In</h1>
                        <input type={'text'} placeholder='Name' />
                        <input type={'email'} placeholder='Email' />
                        <input type={'password'} placeholder='Password' />
                        <a className='Anchor' href='#'>Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="OverlayContainer" signinIn={signIn}>
                    <div className="Overlay" signinIn={signIn}>
                        <div className="OverlayPanel LeftOverlayPanel" signinIn={signIn}>
                            <h1 className="Title">Welcome Back!</h1>
                            <p className="Paragraph">
                                To keep connected with us please login with your personal info
                            </p>
                            <button className="Button GhostButton" onClick={() => toggle(true)}>
                                Sign In
                            </button>
                        </div>
                        <div className="OverlayPanel RightOverlayPanel" signinIn={signIn}>
                            <h1 className="Title">Hello, Friend!</h1>
                            <p className="Paragraph">
                                Enter Your personal details and start journey with us
                            </p>
                            <button className="Button GhostButton" onClick={() => toggle(false)}>
                                Sigin Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
};
export default Sign