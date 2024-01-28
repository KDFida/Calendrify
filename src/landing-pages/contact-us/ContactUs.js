import React, { useState } from "react";
import './contactUs.css';
import firebase from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function ContactUs() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(firebase.database, "Contact us Messages"), {
                name: name,
                email: email,
                message: message,
            });
            toast.success("Message has been sent ✅");
        } catch (error) {
            toast.error(error.message);
        }

        setName("");
        setEmail("");
        setMessage("");
    }

    return (
        <div className="contact-container">
            <h1 className="conatctus-title">Contact Us</h1>
            <form className="contact-form" onSubmit={sendMessage}>
                <input id="name" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input id="email" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <textarea id="message" placeholder="Write your message..." value={message} onChange={(e) => setMessage(e.target.value)} required />

                <button className="contactus-button" type="submit" onClick={sendMessage}>Send Message</button>
            </form>
        </div>
    )
}

export default ContactUs;