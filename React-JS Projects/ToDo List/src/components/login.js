// import react and its functions
import React, { useState, useEffect } from "react";
// importing firebase authentication methods
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
// importing auth from firebase
import { auth,googleAuthProvider } from "../firebase.js";
// import router dom for navigation of pages
import { useNavigate } from "react-router-dom";
import "./login.css";

// making a login function and returning a webpage
export default function Login() {
  // exporting constants
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  // if authChange has user then navigate to /todo-page
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/todo-page");
      }
    });
  }, []);

  // when email change set email to target value
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // when password change set password to target value
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // if signin with EmailId/password success then navigate to /todo-page
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/todo-page");
      })
      .catch((err) => alert(err.message));
  };

  // register user with EmailId/Password if success navigate to /todo-page
  const handleRegister = () => {
    // check if password and confirm password are same
    if (registerInformation.password !== registerInformation.confirmPassword) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/todo-page");
      })
      .catch((err) => alert(err.message));
  };

  // Popup Google signin
  const SignInGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        navigate("/todo-page");
      })
      .catch((err) => alert(err.message));
  };

  // returning web page
  return (
    // make a Welcome Div
    <div className="welcome">
      {/* header of page */}
      <h1>Todo-List</h1>
      <div className="login-register-container">
        {/* render layout of the page according to if the user is registering or not */}
        {isRegistering ? (
          <>
          {/* if user is registering */}
          {/* email input */}
            <input
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value
                })
              }
            />
            {/* password input */}
            <input
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value
                })
              }
            />
            {/* confirm password input */}
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value
                })
              }
            />
            {/* register button */}
            <button
              className="sign-in-register-button"
              onClick={handleRegister}
            >
              Register
            </button>
            {/* Back to sign in page button */}
            <button
              className="create-account-button"
              onClick={() => setIsRegistering(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <>
          {/* if user is logging in */}
          {/* email input */}
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
            {/* password input */}
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
            />
            {/* sign in button */}
            <button className="sign-in-register-button" onClick={handleSignIn}>
              Sign In
            </button>
            {/* create account button */}
            <button
              className="create-account-button"
              onClick={() => setIsRegistering(true)}
            >
              Create an account
            </button>
            {/* or div */}
            <div className="or">Or</div>
            {/* sign in with google button */}
            <button className="google-sign-in" onClick={SignInGoogle}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
              <span>Sign in with Google</span>
          </button>
          </>
        )}
      </div>
    </div>
  );
}