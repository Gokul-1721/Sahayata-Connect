const express = require("express");
const router = express.Router();
const userController = require("../controller/user_cont");

// Existing routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/register-event", userController.registerForEvent);
router.get("/check-registration/:eventId", userController.checkEventRegistration);
router.get("/my-registrations", userController.getMyRegisteredEvents);

// --- THE FIX IS HERE ---
// Add the missing routes for handling password reset
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;