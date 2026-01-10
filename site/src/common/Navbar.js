import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const [user, setUser] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        if (userName) {
            setUser({ name: userName });
        }
    }, []);

    // Effect to focus the input when the search overlay becomes active.
    useEffect(() => {
        if (isSearchActive) {
            // Use a timeout to ensure the element is visible before focusing.
            setTimeout(() => searchInputRef.current.focus(), 100);
        }
    }, [isSearchActive]);


    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');
        setUser(null);
        navigate('/login');
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
            setIsSearchActive(false);
            setSearchTerm('');
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink to="/" className="logo">
                        <i className="fas fa-hands-helping" />
                        Sahayata Connect
                    </NavLink>
                    <ul className="nav-links">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About Us</NavLink></li>
                        
                        {user ? (
                            <>
                                <li><NavLink to="/profile">My Profile</NavLink></li>
                                <li className="nav-welcome">Welcome, {user.name}</li>
                                <li>
                                    <button onClick={handleLogout} className="nav-logout-btn">
                                        <i className="fas fa-sign-out-alt"></i> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Register</NavLink></li>
                            </>
                        )}
                        
                        {/* --- NEW, FROM-SCRATCH SEARCH ICON --- */}
                        <li className="search-icon-wrapper">
                            <i className="fas fa-search search-icon-btn" onClick={() => setIsSearchActive(true)} />
                        </li>
                    </ul>
                </div>
            </nav>

            {/* --- NEW, FROM-SCRATCH SEARCH OVERLAY --- */}
            <div className={`search-overlay ${isSearchActive ? 'active' : ''}`}>
                <button className="close-search-btn" onClick={() => setIsSearchActive(false)}>×</button>
                <div className="search-overlay-content">
                    <input 
                        ref={searchInputRef}
                        type="text"
                        className="search-overlay-input"
                        placeholder="Type to search for events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="search-overlay-btn" onClick={handleSearch}>Search</button>
                </div>
            </div>
        </>
    );
}

export default Navbar;

