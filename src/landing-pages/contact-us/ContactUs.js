import React from "react";
import './contactUs.css';

function ContactUs() {
    return (
        <div className="contact-container">
            <h1 className="title">Contact Us</h1>
            <form className="contact-form">
                <input id="name" type="text" placeholder="Full Name" required />
                <input id="email" type="email" placeholder="Email Address" required />
                <textarea id="message" placeholder="Write your message..." required />

                <button type="submit">Send Message</button>
            </form>
        </div>
    )
}

export default ContactUs;