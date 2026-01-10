// admin/src/pages/TotalRegistrations.js

import { useState, useEffect } from 'react';
import Sidebar from '../common/Sidebar';
import Topbar from '../common/Topbar';
import Footer from '../common/Footer';

function TotalRegistrations() {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/details/all-registrations`);
                const data = await response.json();
                setRegistrations(data);
            } catch (error) {
                console.error("Failed to fetch registrations:", error);
            }
        };
        fetchRegistrations();
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
                                                <th>User Name</th>
                                                <th>Event Name</th>
                                                <th>Registration Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registrations.map(reg => (
                                                <tr key={reg._id}>
                                                    <td>{reg.userName}</td>
                                                    <td>{reg.eventName}</td>
                                                    <td>{new Date(reg.registrationDate).toLocaleDateString()}</td>
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

export default TotalRegistrations;