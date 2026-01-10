// routes/detailsr.js

const exp = require("express");
const router = exp.Router();
const detailsController = require("../controller/details_cont");

// Route to get all users
router.get("/all-users", detailsController.getAllUsers);

// Route to get all registrations
router.get("/all-registrations", detailsController.getAllRegistrations);

module.exports = router;