import Sidebar from '../common/Sidebar';
import Topbar from '../common/Topbar';
import Footer from '../common/Footer';
import { useState } from 'react';

function Addevent() {
    const [eName, setEname] = useState('');
    const [eDate, setEdate] = useState('');
    const [eImage, setEimg] = useState(null);
    const [eVenue, setEvenue] = useState('');
    const [eDetails, setEdetails] = useState('');

    const handleAddEvent = async () => {
        // --- THE FIX IS HERE ---
        // 1. Check if the date is selected
        if (!eDate) {
            alert("Please select an event date.");
            return;
        }

        // 2. Convert the date from "yyyy-mm-dd" to "dd/mm/yyyy"
        const parts = eDate.split('-'); // Splits "2025-10-26" into ["2025", "10", "26"]
        const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`; // Creates "26/10/2025"

        // 3. Create FormData and append the correctly formatted date
        const fd = new FormData();
        fd.append("eName", eName);
        fd.append("eDate", formattedDate); // Use the formatted date
        fd.append("eImage", eImage);
        fd.append("eVenue", eVenue);
        fd.append("eDetails", eDetails);

        try {
            const resp = await fetch("http://localhost:2000/event/add", {
                method: 'POST',
                body: fd
            });
            const data = await resp.json();
            console.log(data);
            alert("Event added successfully!");
            // Optionally, clear the form fields after successful submission
            setEname('');
            setEdate('');
            setEimg(null);
            setEvenue('');
            setEdetails('');
            document.querySelector('input[type="file"]').value = ''; // Clear file input
        } catch (error) {
            console.error("Failed to add event:", error);
            alert("Error adding event. Please check the console.");
        }
    };

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                        <p>Event Name</p>
                        <p><input value={eName} onChange={(ev) => setEname(ev.target.value)} type="text" className="form-control" placeholder="Enter event name" /></p>
                        <p>Event Date</p>
                        <p><input value={eDate} onChange={(ev) => setEdate(ev.target.value)} type="date" className="form-control" /></p>
                        <p>Event Image</p>
                        <p><input onChange={(ev) => setEimg(ev.target.files[0])} type="file" className="form-control" /></p>
                        <p>Event Venue</p>
                        <p><input value={eVenue} onChange={(ev) => setEvenue(ev.target.value)} type="text" className="form-control" placeholder="Enter event venue" /></p>
                        <p>Event Details</p>
                        <p><textarea value={eDetails} onChange={(ev) => setEdetails(ev.target.value)} className="form-control" placeholder="Enter event details" /></p>
                        <p><button onClick={handleAddEvent} className="btn btn-success">Add Event</button></p>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Addevent;