import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </NavLink>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item">
                <NavLink className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span>
                </NavLink>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Interface</div>
            <li className="nav-item">
                {/* --- THE FIX IS HERE: <a> tag replaced with a <div> --- */}
                <div className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" style={{ cursor: 'pointer' }}>
                    <i className="fas fa-fw fa-cog" />
                    <span>Manage Event</span>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <NavLink className="collapse-item" to="/addevent">Add Event</NavLink>
                        <NavLink className="collapse-item" to="/listevent">List Event</NavLink>
                    </div>
                </div>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
        </ul>
    );
}
export default Sidebar;