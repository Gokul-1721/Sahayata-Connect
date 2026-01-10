// controller/details_cont.js

const User = require("../db/userdb");
const Registration = require("../db/registrationdb");

module.exports = {
    // Function to get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}, 'firstName lastName email phone'); // Select specific fields
            res.json(users);
        } catch (err) {
            console.error("Error fetching all users:", err);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    // Function to get all registrations
    async getAllRegistrations(req, res) {
        try {
            const registrations = await Registration.find({}).sort({ registrationDate: -1 }); // Sort by newest first
            res.json(registrations);
        } catch (err) {
            console.error("Error fetching all registrations:", err);
            res.status(500).json({ msg: "Server Error" });
        }
    }
};