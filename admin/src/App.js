// admin/src/App.js

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Addevent from "./pages/Addevent";
import Listevent from "./pages/Listevent";
import Login from "./pages/Login";
import TotalUsers from "./pages/TotalUsers";
import TotalRegistrations from "./pages/TotalRegistrations";

// --- NEW PAGE ---
import EventsThisMonth from "./pages/EventsThisMonth";

import "./App.css";

function App() {
  const PrivateRoute = ({ children }) => {
    var isAuthenticated = localStorage.getItem("aname");
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/addevent" element={<PrivateRoute><Addevent /></PrivateRoute>} />
        <Route path="/listevent" element={<PrivateRoute><Listevent /></PrivateRoute>} />
        <Route path="/total-users" element={<PrivateRoute><TotalUsers /></PrivateRoute>} />
        <Route path="/total-registrations" element={<PrivateRoute><TotalRegistrations /></PrivateRoute>} />
        
        {/* --- NEW ROUTE --- */}
        <Route path="/events-this-month" element={<PrivateRoute><EventsThisMonth /></PrivateRoute>} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;