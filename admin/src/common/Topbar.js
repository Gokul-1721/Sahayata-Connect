import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Topbar() {
    const [an, setAn] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const location = useLocation();

    useEffect(() => {
        const adminName = localStorage.getItem("aname");
        setAn(adminName);
    }, []);

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setPageTitle('Dashboard');
                break;
            case '/addevent':
                setPageTitle('Add Event');
                break;
            case '/listevent':
                setPageTitle('List Event');
                break;
            case '/total-users':
                setPageTitle('All Registered Users');
                break;
            case '/total-registrations':
                setPageTitle('All Event Registrations');
                break;
            case '/events-this-month':
                setPageTitle('Events This Month');
                break;
            default:
                setPageTitle('');
        }
    }, [location.pathname]);

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            
            <h1 className="h3 mb-0 text-gray-800">{pageTitle}</h1>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                    {/* --- THE FIX IS HERE: <a> tag replaced with a <div> --- */}
                    <div className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ cursor: 'pointer' }}>
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{an}</span>
                        <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="Profile" />
                    </div>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        {/* --- AND HERE --- */}
                        <div className="dropdown-item" data-toggle="modal" data-target="#logoutModal" style={{ cursor: 'pointer' }}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                            Logout
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Topbar;