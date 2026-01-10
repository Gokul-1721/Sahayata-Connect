
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

function About() {
    // State to check if a user is logged in.
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // This effect runs when the component loads to check for a logged-in user.
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            <div>
                <Navbar />
                <section className="hero">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>About Sahayata Connect</h1>
                            <p>Empowering communities through compassion, connection, and collective action</p>
                        </div>
                    </div>
                    <div className="hero-background" />
                </section>
                <section className="mission-section">
                    <div className="container">
                        <div className="mission-grid">
                            <div className="mission-text">
                                <h2>Our Mission</h2>
                                <p>To create lasting positive change in communities by connecting people with opportunities to serve, support, and uplift one another. We believe that every individual has the power to make a difference, and together we can build a more compassionate and equitable world.</p>
                                <div className="mission-stats">
                                    <div className="stat">
                                        <h3>50K+</h3>
                                        <p>Lives Impacted</p>
                                    </div>
                                    <div className="stat">
                                        <h3>500+</h3>
                                        <p>Volunteers</p>
                                    </div>
                                    <div className="stat">
                                        <h3>25+</h3>
                                        <p>Active Projects</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mission-image-container">
                                <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Volunteers working together" />
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Other sections can be added here */}

                <section className="cta-section">
                    <div className="container">
                        <div className="cta-content">
                            <h2>Join Our Mission</h2>
                            <p>Be part of the change you want to see in the world. Together, we can create lasting impact in our communities.</p>
                            <div className="cta-buttons">
                                {/* --- THE FIX IS HERE --- */}
                                {/* This button now links to the correct page based on login status. */}
                                <NavLink to={isLoggedIn ? "/profile" : "/register"} className="cta-btn primary">
                                    Become a Volunteer
                                </NavLink>
                                <NavLink to="/donate" className="cta-btn secondary">Make a Donation</NavLink>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}

export default About;

