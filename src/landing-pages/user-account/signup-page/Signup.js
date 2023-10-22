import React, { useState} from "react";
import './signup.css';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "../../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const authentication = getAuth();
    const redirectTo = useNavigate();

    const passwordValidation = (password, confirmPwd) => {
        if (password !== confirmPwd) {
            return "Passwords do not match. Please try again!";
        } 

        if (password.length < 8) {
            return "Password must contain at least 8 characters. Please try again!";
        }

        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one upper case character. Please try again!";
        }

        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lower case character. Please try again!";
        }

        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one numeric character. Please try again!";
        }

        if (!/[!@#?$%&]/.test(password)) {
            return "Password must contain at least one special character (!@#?$%&). Please try again!";
        }

        return null;
    }

    const signUp = (e) => {
        e.preventDefault();

        const passwordCheck = passwordValidation(password, confirmPwd);
        if (passwordCheck !== null) {
            return;
        }

        createUserWithEmailAndPassword(authentication, email, password)
        .then((userCredentials) => {
            const uid = userCredentials.user.uid;
            let accountCreationDate = new Date().toLocaleDateString();
            return setDoc(doc(firebase.database, "Users", uid), {
                uid: uid,
                name: name,
                email: email,
                creationDate: accountCreationDate
            });
        })
        .then(() => {
            redirectTo('/login');
        })
        .catch((error) => {
            
        })
    }

    return (
        <div className="signup">
            <div className="signup-container">
                <h1 className="signup-title">Create an Account</h1>
                <form className="signup-form">
                    <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name"></input>
                    <input id="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                    <input id="password-input" type="password" value={password} onChange={(e) => setPasword(e.target.value)} placeholder="Password"></input>
                    <input id="confirm-password-input" type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} placeholder="Confirm Password"></input>
                    <button id="submit-button" type="submit" onClick={signUp}>Create Account</button>
                    <p className="already-registered"> Already registered? <Link to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup;