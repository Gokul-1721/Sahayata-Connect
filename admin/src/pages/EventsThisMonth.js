// admin/src/pages/EventsThisMonth.js

import { useState, useEffect } from 'react';
import Sidebar from '../common/Sidebar';
import Topbar from '../common/Topbar';
import Footer from '../common/Footer';

function EventsThisMonth() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchMonthlyEvents = async () => {
            try {
                // We will create this API endpoint in the backend steps
                const response = await fetch(`${process.env.REACT_APP_API_URL}/dashboard/detailed-events-this-month`);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch monthly events:", error);
            }
        };
        fetchMonthlyEvents();
    }, []);

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Event Name</th>
                                                <th>Date</th>
                                                <th>Venue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.map(event => (
                                                <tr key={event._id}>
                                                    <td>{event.eName}</td>
                                                    <td>{event.eDate}</td>
                                                    <td>{event.eVenue}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default EventsThisMonth;