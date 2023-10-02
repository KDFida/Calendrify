import React from "react";
import './forgotPassword.css';

function ForgotPassword() {
    return (
        <div className="forgot-password">
            <div className="forgot-password-container">
                <h1 className="forgot-password-title">Forgot Password</h1>
                <form className="forgot-password-form">
                    <input id="email-input" type="email" placeholder="Email" required />
                    <button type="submit" >Send email</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;