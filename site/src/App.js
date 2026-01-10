import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from "./pages/EventDetail";
import Profile from "./pages/Profile";
import Donate from "./pages/Donate";
import Search from "./pages/Search";
// --- FIX IS HERE (Part 1/2) ---
// Import the new components.
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  return token ? <Navigate to="/" /> : children;
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        <Route 
          path="/login" 
          element={<PublicRoute><Login /></PublicRoute>} 
        />
        <Route 
          path="/register" 
          element={<PublicRoute><Register /></PublicRoute>} 
        />
        
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/search" element={<Search />} />
        
        {/* --- FIX IS HERE (Part 2/2) --- */}
        {/* Add the routes for the forgot and reset password pages. */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route 
          path="/profile" 
          element={<PrivateRoute><Profile /></PrivateRoute>} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;