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

    const signUp = (e) => {
        e.preventDefault();

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