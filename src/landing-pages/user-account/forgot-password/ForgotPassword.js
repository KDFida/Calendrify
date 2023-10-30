import React, { useState } from "react";
import './forgotPassword.css';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const authentication = getAuth();
    const redirectTo = useNavigate();

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(authentication, email);
            toast.success("Reset password email sent ✅");
            redirectTo('/login');
        } catch (error) {
            toast.error("Something went wrong. Please try again!");
        }
    }

    return (
        <div className="forgot-password">
            <div className="forgot-password-container">
                <h1 className="forgot-password-title">Forgot Password</h1>
                <form className="forgot-password-form">
                    <input id="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <button type="submit" onClick={resetPassword}>Send email</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;