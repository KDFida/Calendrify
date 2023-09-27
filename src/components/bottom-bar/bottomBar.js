import React from "react";
import './bottomBar.css';
import { Link } from "react-router-dom";

function BottomBar() {
    return (
        <div className="bottomBar">
            <div className="bottomBar-container">
                <div className="bottomBar-options">
                    <Link to="/home" className="home-label">Home</Link>
                    <Link to="/about-us" className='about-label'>About Us</Link>
                    <Link to="/contact-us" className='contact-label'>Contact Us</Link>
                </div>
            </div>
        </div>
    )
}

export default BottomBar;