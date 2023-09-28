import React from "react";
import './login.css';

function Login() {
    return (
        <div className="login">
            <div className="login-container">
                <h1 className="login-title">Log In</h1>
                <form className="login-form">
                    <input id="email" type="email" placeholder="Email" />
                    <input id="password" type="password" placeholder="Password" />
                    <button id="submit-button" type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login;