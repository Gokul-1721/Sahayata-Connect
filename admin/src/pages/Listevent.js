import Sidebar from '../common/Sidebar';
import Topbar from '../common/Topbar';
import Footer from '../common/Footer';
import { useEffect, useState } from 'react';

function Listevent() {
    const [event, setEvent] = useState([]);

    const getdata = async () => {
        const resp = await fetch(`${process.env.REACT_APP_API_URL}/event/select`);
        const data = await resp.json();
        setEvent(data);
    };

    useEffect(() => {
        getdata();
    }, []);

    const del = async (id) => {
        if (window.confirm("Are you sure?")) {
            await fetch(`${process.env.REACT_APP_API_URL}/event/delete/` + id, {
                method: 'DELETE'
            });
            getdata(); // Refresh the list
        }
    };

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                        {/* The h1 tag has been removed from here */}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Date</th>
                                    <th>Image</th>
                                    <th>Venue</th>
                                    <th>Details</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {event.map((e) => (
                                    <tr key={e._id}>
                                        <td>{e.eName}</td>
                                        <td>{e.eDate}</td>
                                        <td><img className="eventimg" src={`${process.env.REACT_APP_API_URL}/event_img/` + e.eImage} alt={e.eName} /></td>
                                        <td>{e.eVenue}</td>
                                        <td>{e.eDetails}</td>
                                        <td><button onClick={() => del(e._id)} className="btn btn-danger">Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
export default Listevent;