import React from "react";
import './login.css';
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className="login">
            <div className="login-container">
                <h1 className="login-title">Log In</h1>
                <form className="login-form">
                    <input id="email" type="email" placeholder="Email" />
                    <input id="password" type="password" placeholder="Password" />
                    <Link className="forgot-password" to="/forgot-password">Forgot Password?</Link>
                    <button id="submit-button" type="submit">Sign In</button>
                    <p className="create-account"> Not registered? <Link to="/create-account">Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;