import { NavLink } from "react-router-dom";

function LRNavbar() {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    {/* Replaced <a> with <NavLink> for client-side routing */}
                    <NavLink to="/" className="logo">
                        <i className="fas fa-hands-helping" />
                        Sahayata Connect
                    </NavLink>
                    <ul className="nav-links">
                        {/* Replaced <a> tags with <NavLink> */}
                        <li><NavLink to="/" exact>Home</NavLink></li>
                        <li><NavLink to="/about">About Us</NavLink></li>
                        <li><NavLink to="/login" >Login</NavLink></li>
                        <li><NavLink to="/register" >Register</NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default LRNavbar;
