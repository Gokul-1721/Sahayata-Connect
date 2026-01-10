const exp = require("express");
const router = exp.Router();
const dc = require("../controller/dashboard_cont");

// Original route for the first 3 cards
router.get("/stats", dc.getStats);

// =================================================================
// NEW ROUTES FOR THE ENHANCED DASHBOARD
// =================================================================

// Route for the "Events This Month" card
router.get("/events-this-month", dc.getEventsThisMonth);

// Route for the "User Growth" chart
router.get("/user-growth", dc.getUserGrowth);

// Route for the "Event Popularity" chart
router.get("/event-popularity", dc.getEventPopularity);

// Route for the dynamic "Recent Events" table
router.get("/recent-events", dc.getRecentEvents);

// New route for detailed events this month
router.get("/detailed-events-this-month", dc.getDetailedEventsThisMonth);

module.exports = router;