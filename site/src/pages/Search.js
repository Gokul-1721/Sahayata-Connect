import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setSearchResults([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/event/select?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('The search request failed. Please try again later.');
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error("Failed to fetch search results:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    // --- THE FIX IS HERE ---
    // This robust date parsing and formatting logic handles multiple date formats correctly.
    const formatDate = (dateString) => {
        if (!dateString) return 'Date Not Specified';

        let date;
        // Check if the date is in ISO format (e.g., from new Date().toISOString())
        if (dateString.includes('T')) {
            date = new Date(dateString);
        } else {
            // Handle formats like "YYYY-MM-DD" or "dd/mm/yyyy"
            const parts = dateString.split(/[-/]/);
            if (parts.length === 3) {
                const [p1, p2, p3] = parts;
                // Assuming YYYY-MM-DD or dd/mm/yyyy by checking the length of the first part
                if (p1.length === 4) { // YYYY-MM-DD
                    date = new Date(p1, p2 - 1, p3);
                } else { // dd/mm/yyyy
                    date = new Date(p3, p2 - 1, p1);
                }
            } else {
                date = new Date(dateString); // Fallback for other potential formats
            }
        }

        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <>
            <Navbar />
            <div className="search-results-container">
                <h2>Search Results for: "{query}"</h2>
                {loading && <p>Loading search results...</p>}
                {error && <div className="error-message">{error}</div>}
                
                {!loading && !error && searchResults.length > 0 ? (
                    <div className="event-grid">
                        {searchResults.map((event) => (
                            <div className="event-card" key={event._id}>
                                <div className="event-image" style={{ backgroundImage: `url("${process.env.REACT_APP_API_URL}/event_img/${event.eImage}")` }}></div>
                                <div className="event-content">
                                    <h3 className="event-title">{event.eName}</h3>
                                    <div className="event-meta">
                                        <span className="event-date">
                                            <i className="fas fa-calendar-alt"></i> {formatDate(event.eDate)}
                                        </span>
                                        <span className="event-location">
                                            <i className="fas fa-map-marker-alt"></i> {event.eVenue}
                                        </span>
                                    </div>
                                    <p className="event-description">{event.eDetails.substring(0, 100)}...</p>
                                    <Link to={`/event/${event._id}`} className="join-btn">View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && !error && (
                        <div className="no-results">
                            <h3>No events found</h3>
                            <p>We couldn't find any events matching your search term. Please try a different search.</p>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </>
    );
}

export default Search;