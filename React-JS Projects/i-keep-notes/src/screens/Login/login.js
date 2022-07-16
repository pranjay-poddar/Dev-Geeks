import React, { useState, useContext } from 'react';
import './login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-bootstrap';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authApp from '../../firebase';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import google from '../../assets/google.png';

export const Login = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [otp, setOTP] = useState();
  const [checkOtp, setCheckOtp] = useState();
  const [userEmail, setUserEmail] = useState();

  const auth = getAuth(authApp);
  let history = useHistory();
  const activeUser = useContext(AuthContext);

  ///////////////////////////OTP////////////////////////////

  const createOtp = () => {};

  // toast.success(`User ${userEmail} logged in!`);
  // history.push({
  //   pathname: '/homepage',
  //   state: { currentUser: userEmail, user: currentUser },
  // });

  ///////////////////////////OTP////////////////////////////

  const otpCheck = () => {
    console.log('otpCheck');
    if (otp == checkOtp) {
      ///////////local storage check///////////
      const re = /^[0-9\b]+$/;
      if (username.length === 10 && re.test(username)) {
        let a = JSON.parse(localStorage.getItem('session'));
        let b = a.filter((item) => item.Phone == username);

        console.log('username', b[0].Email);
        signInWithEmailAndPassword(auth, b[0].Email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setCurrentUser(user);
            toast.success(`User ${user.email} logged in!`);
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error('User login failed');
            // toast.error(errorMessage);
          });
        return;
      }
      ///////////local storage check///////////
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setCurrentUser(user);
          toast.success(`User ${user.email} logged in!`);
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error('Please enter valid username/password ');
        });
    } else {
      const errorMessage = 'Wrong OTP';
      toast.error('Please make sure your OTP is valid');
    }
  };

  const handleSubmit = (e, currentUser) => {
    e.preventDefault();
    setOTP(Math.floor(Math.random() * 9999));
    console.log(otp);
    console.log('createOtp');
  };

  function handleGoogleSignIn(e) {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    // signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log('From google sso', user);
        setCurrentUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('error on signin', errorMessage);
        toast.error('Sign In Failed');
      });
  }

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );

  return (
    <div>
      <div id='login'>
        <form className='container mx-auto col-4 d-flex justify-content-center flex-column'>
          {otp && <Alert variant='success'>enter the OTP - {otp}</Alert>}
          <h3>Sign In</h3>
          <div className='row justify-content-start login-row pt-4'>
            <div className='col align-self-start pt-1'>
              <div className='form-group p-2 '>
                <label>Email / Mobile</label>
              </div>
            </div>
            <div className='col-8'>
              <div className='form-group p-2 '>
                <input
                  type='email'
                  className='form-control'
                  name='username'
                  placeholder='Enter email'
                  onChange={(e) => setUserName(e.target.value)}
                />
                {!username && <p className='error'>*Enter Email / Mobile </p>}
              </div>
            </div>
          </div>
          <div className='row justify-content-start login-row'>
            <div className='col align-self-start pt-1'>
              <div className='form-group p-2 '>
                <label>Password</label>
              </div>
            </div>
            <div className='col-8'>
              <div className='form-group p-2'>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!password && <p className='error'>*Enter password</p>}
              </div>
            </div>
          </div>
          {/* ////////////////////////////// */}
          <div>
            <div
              style={{
                display: !otp && 'none',
              }}
              className='row justify-content-start login-row'
            >
              <div className='col align-self-start pt-1 d-flex justify-centent-center align-tem-center '>
                <div className='form-group p-2 '>
                  <label>Enter OTP</label>
                </div>
              </div>
              <div className='col-8'>
                <div className='form-group p-2' style={{ display: 'flex' }}>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    placeholder='Enter password'
                    onChange={(e) => setCheckOtp(e.target.value)}
                  />
                  <button
                    style={{
                      marginLeft: '10px',
                      borderRadius: '10px',
                    }}
                    variant='primary'
                    type='button'
                    className='btn btn-info btn-lg btn-block'
                    onClick={() => otpCheck()}
                  >
                    verify
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /////////////////////////// */}
          <div id='login-buttons' className='row justify-content-center'>
            <div>
              <button
                variant='primary'
                type='button'
                className='btn btn-info btn-lg btn-block'
                onClick={(e) => handleSubmit(e)}
                disabled={!username | !password}
              >
                {' '}
                Submit
              </button>
            </div>
            <p className='link'>
              Forgot Password? <Link className="text-info" to='/resetPassword'>Reset Password</Link>
            </p>
          </div>
          <div className='row '>
            <ColoredLine color='red' />
            <div>
              <button
                variant='primary'
                className='btn btn-light btn-md pr-10'
                onClick={(e) => handleGoogleSignIn(e)}
              >
                <img
                  src={google}
                  srcSet={google}
                  width='40'
                  radius='10'
                  alt='google'
                />
                Sign in With Google
              </button>
            </div>
            <p className='link'>
              New to IKeep?{' '}
              <Link to='/signup' className='text-info'>
                Join now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
