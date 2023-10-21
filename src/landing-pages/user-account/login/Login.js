import React, { useState } from "react";
import './login.css';
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");

    const authentication = getAuth();
    const redirectTo = useNavigate();

    const signIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(authentication, email, password)
        .then((userCredentials) => { 
            redirectTo('/app/home');
        })
        .catch((error) => {
        })
    }

    return (
        <div className="login">
            <div className="login-container">
                <h1 className="login-title">Log In</h1>
                <form className="login-form">
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input id="password" type="password" value={password} onChange={(e) => setPasword(e.target.value)} placeholder="Password" />
                    <Link className="forgot-password" to="/forgot-password">Forgot Password?</Link>
                    <button id="submit-button" type="submit" onClick={signIn}>Sign In</button>
                    <p className="create-account"> Not registered? <Link to="/create-account">Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;