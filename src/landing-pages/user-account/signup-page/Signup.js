import React from "react";
import './signup.css';
import { Link } from "react-router-dom";

function Signup() {
    return (
        <div className="signup">
            <div className="signup-container">
                <h1 className="signup-title">Create an Account</h1>
                <form className="signup-form">
                    <input id="name-input" type="text" placeholder="Full Name"></input>
                    <input id="email-input" type="email" placeholder="Email"></input>
                    <input id="password-input" type="password" placeholder="Password"></input>
                    <input id="confirm-password-input" type="password" placeholder="Confirm Password"></input>
                    <button id="submit-button" type="submit">Create Account</button>
                    <p className="already-registered"> Already registered? <Link to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup;