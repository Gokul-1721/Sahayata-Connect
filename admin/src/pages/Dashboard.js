import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Topbar from '../common/Topbar';
import Footer from '../common/Footer';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
    const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0, totalRegistrations: 0 });
    const [eventsThisMonth, setEventsThisMonth] = useState(0);
    const [userGrowthData, setUserGrowthData] = useState({ labels: [], datasets: [] });
    const [eventPopularityData, setEventPopularityData] = useState({ labels: [], datasets: [] });
    const [recentEvents, setRecentEvents] = useState([]);
    const [tableLimit, setTableLimit] = useState(5);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [statsRes, eventsMonthRes, userGrowthRes, eventPopularityRes] = await Promise.all([
                    fetch("http://localhost:2000/dashboard/stats"),
                    fetch("http://localhost:2000/dashboard/events-this-month"),
                    fetch("http://localhost:2000/dashboard/user-growth"),
                    fetch("http://localhost:2000/dashboard/event-popularity")
                ]);
                const statsData = await statsRes.json();
                const eventsMonthData = await eventsMonthRes.json();
                const userGrowth = await userGrowthRes.json();
                const eventPopularity = await eventPopularityRes.json();

                setStats(statsData);
                setEventsThisMonth(eventsMonthData.eventsThisMonth);
                setUserGrowthData({
                    labels: userGrowth.labels,
                    datasets: [{ label: 'New Users', data: userGrowth.data, fill: true, backgroundColor: 'rgba(78, 115, 223, 0.05)', borderColor: 'rgba(78, 115, 223, 1)', tension: 0.3 }]
                });
                setEventPopularityData({
                    labels: eventPopularity.map(item => item.name),
                    datasets: [{ data: eventPopularity.map(item => item.count), backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'], hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#dda20a', '#c73123'] }]
                });
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };
        fetchAllData();
    }, []);

    useEffect(() => {
        const fetchRecentEvents = async () => {
            try {
                const response = await fetch(`http://localhost:2000/dashboard/recent-events?limit=${tableLimit}`);
                const data = await response.json();
                setRecentEvents(data);
            } catch (error) {
                console.error("Failed to fetch recent events:", error);
            }
        };
        fetchRecentEvents();
    }, [tableLimit]);

    // The incorrect formatDate function has been removed.

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                        <div className="row">
                           <div className="col-xl-3 col-md-6 mb-4">
                               <Link to="/listevent" style={{ textDecoration: 'none' }}>
                                   <div className="card border-left-primary shadow h-100 py-2">
                                       <div className="card-body">
                                           <div className="row no-gutters align-items-center">
                                               <div className="col mr-2">
                                                   <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Events</div>
                                                   <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.totalEvents}</div>
                                               </div>
                                               <div className="col-auto"><i className="fas fa-calendar fa-2x text-gray-300"></i></div>
                                           </div>
                                       </div>
                                   </div>
                               </Link>
                           </div>
                           <div className="col-xl-3 col-md-6 mb-4">
                               <Link to="/total-users" style={{ textDecoration: 'none' }}>
                                   <div className="card border-left-success shadow h-100 py-2">
                                       <div className="card-body">
                                           <div className="row no-gutters align-items-center">
                                               <div className="col mr-2">
                                                   <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Total Users</div>
                                                   <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.totalUsers}</div>
                                               </div>
                                               <div className="col-auto"><i className="fas fa-users fa-2x text-gray-300"></i></div>
                                           </div>
                                       </div>
                                   </div>
                               </Link>
                           </div>
                           <div className="col-xl-3 col-md-6 mb-4">
                               <Link to="/total-registrations" style={{ textDecoration: 'none' }}>
                                   <div className="card border-left-info shadow h-100 py-2">
                                       <div className="card-body">
                                           <div className="row no-gutters align-items-center">
                                               <div className="col mr-2">
                                                   <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Registrations</div>
                                                   <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.totalRegistrations}</div>
                                               </div>
                                               <div className="col-auto"><i className="fas fa-clipboard-list fa-2x text-gray-300"></i></div>
                                           </div>
                                       </div>
                                   </div>
                               </Link>
                           </div>
                           <div className="col-xl-3 col-md-6 mb-4">
                               <Link to="/events-this-month" style={{ textDecoration: 'none' }}>
                                   <div className="card border-left-warning shadow h-100 py-2">
                                       <div className="card-body">
                                           <div className="row no-gutters align-items-center">
                                               <div className="col mr-2">
                                                   <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Events This Month</div>
                                                   <div className="h5 mb-0 font-weight-bold text-gray-800">{eventsThisMonth}</div>
                                               </div>
                                               <div className="col-auto"><i className="fas fa-check-circle fa-2x text-gray-300"></i></div>
                                           </div>
                                       </div>
                                   </div>
                               </Link>
                           </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-8 col-lg-7">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">User Growth (Last 7 Days)</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="chart-area"><Line data={userGrowthData} options={{ maintainAspectRatio: false, responsive: true }} /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-5">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Event Popularity</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="chart-pie pt-4"><Doughnut data={eventPopularityData} options={{ maintainAspectRatio: false, responsive: true }} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Recently Added Events</h6>
                                <div className="d-flex align-items-center">
                                    <label htmlFor="table-limit-select" className="mr-2 mb-0">Show:</label>
                                    <select id="table-limit-select" className="form-control form-control-sm" value={tableLimit} onChange={(e) => setTableLimit(Number(e.target.value))} style={{ width: 'auto' }}>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </div>
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
                                            {recentEvents.map(event => (
                                                <tr key={event._id}>
                                                    <td>{event.eName}</td>
                                                    {/* --- THE DEFINITIVE FIX IS HERE --- */}
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

export default Dashboard;