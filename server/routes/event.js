const exp = require("express");
const router = exp.Router();
const ec = require("../controller/event_cont");

// Route to add a new event
router.post("/add", ec.addEvent);

// Route to get events. This route also handles search queries.
// If a '?query=' parameter is in the URL, the controller will filter results.
router.get("/select", ec.selectEvent);

// Route to get a single event by its unique ID
router.get("/select/:id", ec.selectOneEvent);

// Route to delete an event by its unique ID
router.delete("/delete/:id", ec.delEvent);

module.exports = router;