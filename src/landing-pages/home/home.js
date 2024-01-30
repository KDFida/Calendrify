import React from "react";
import './home.css';
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className="home-content">
                <h1 className="homepage-title">Welcome to Calendrify</h1>
                <div className="home-container">
                    <section className="create-account-homepage">
                        <h2 className="createAccount">Create an account  today!</h2>
                        <Link to='/create-account'>
                            <button className="signup-today-button">Get Started</button>
                        </Link>
                    </section>

                    <section className="how-it-works">
                        <h2>How It Works</h2>
                        <p>Calendrify simplifies your scheduling with an intuitive and user-friendly interface. Here's how:</p>
                        <ul>
                            <li>Step 1: Create an account and set up your calendar.</li>
                            <li>Step 2: Easily add and manage your tasks and events.</li>
                            <li>Step 3: Stay organized and never miss a deadline.</li>
                        </ul>
                    </section>

                    <section class="benefits">
                        <h2>Benefits</h2>
                        <p>With Calendrify, you gain more than just a scheduling tool. You get:</p>
                        <ul>
                            <li>Improved Time Management</li>
                            <li>Access Across Devices</li>
                        </ul>
                    </section>

                    <section class="faq">
                        <h2>Frequently Asked Questions</h2>
                        <div class="faq-item">
                            <h3>Is Calendrify free to use?</h3>
                            <p>Yes, Calendrify is currently free to use and is accessible to everyone.</p>
                        </div>

                        <div class="faq-item">
                            <h3>Is it free to create an account?</h3>
                            <p>Absolutely! Creating an account on Calendrify is completely free. Sign up and start organizing your schedule in minutes.</p>
                        </div>

                        <div class="faq-item">
                            <h3>Can I use Calendrify on any device?</h3>
                            <p>Yes, Calendrify is designed to be compatible across all your devices. Whether you're on a computer, tablet, or smartphone, you can manage your schedule on the go.</p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Home;