import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

function EventDetail() {
    const [event, setEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false); // New state to track registration status
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getEventData = async () => {
            try {
                // 1. Fetch the event details
                const eventResp = await fetch(`${process.env.REACT_APP_API_URL}/event/select/${id}`);
                if (!eventResp.ok) throw new Error('Event not found');
                const eventData = await eventResp.json();
                setEvent(eventData);

                // --- NEW LOGIC ---
                // 2. After getting event details, check if the user is registered for this event
                const token = localStorage.getItem('userToken');
                if (token) {
                    const regResp = await fetch(`${process.env.REACT_APP_API_URL}/user/check-registration/${id}`, {
                        headers: { 'x-auth-token': token }
                    });
                    const regData = await regResp.json();
                    setIsRegistered(regData.isRegistered);
                }
            } catch (error) {
                console.error('Failed to load event data:', error);
                setEvent(null);
            }
        };
        if (id) {
            getEventData();
        }
    }, [id]);

    const formatDate = (dateString) => {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return isNaN(date) ? dateString : date.toLocaleDateString('en-US', options);
        } catch (error) {
            return dateString;
        }
    };

    const handleRegisterClick = async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register-event`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ eventId: event._id, eventName: event.eName })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.msg || "Registration failed.");

            setFeedback({ message: data.msg, type: 'success' });
            setIsRegistered(true); // Update the state to show the user is now registered

        } catch (err) {
            setFeedback({ message: err.message, type: 'error' });
        }
    };
    
    if (!event) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="event-detail-container">
                <div className="event-detail-card">
                    <div className="event-detail-image-wrapper">
                        <img
                            src={`${process.env.REACT_APP_API_URL}/event_img/${event.eImage}`}
                            alt={event.eName}
                            className="event-detail-image"
                        />
                    </div>
                    <div className="event-detail-content">
                        <h1 className="event-detail-title">{event.eName}</h1>
                        <div className="event-detail-meta">
                            <span><i className="fas fa-calendar-alt"></i>{formatDate(event.eDate)}</span>
                            <span><i className="fas fa-map-marker-alt"></i>{event.eVenue}</span>
                        </div>
                        <p className="event-detail-description">{event.eDetails}</p>

                        {feedback.message && (
                            <div className={`feedback-message ${feedback.type}`}>{feedback.message}</div>
                        )}

                        <div className="event-detail-actions">
                            {/* --- DYNAMIC BUTTON --- */}
                            {/* The button is now disabled and has different text if the user is registered */}
                            <button 
                                onClick={handleRegisterClick} 
                                className="cta-btn primary"
                                disabled={isRegistered}
                            >
                                {isRegistered ? 'Already Registered' : 'Register for this Event'}
                            </button>
                            <Link to="/" className="cta-btn secondary">Back to Events</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EventDetail;

