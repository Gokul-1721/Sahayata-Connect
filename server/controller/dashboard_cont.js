const User = require("../db/userdb");
const Event = require("../db/eventdb");
const Registration = require("../db/registrationdb");

module.exports = {
    async getStats(req, res) {
        try {
            const [userCount, eventCount, registrationCount] = await Promise.all([
                User.countDocuments(),
                Event.countDocuments(),
                Registration.countDocuments()
            ]);

            res.json({
                totalUsers: userCount,
                totalEvents: eventCount,
                totalRegistrations: registrationCount
            });

        } catch (err) {
            console.error("Error fetching dashboard stats:", err);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    // --- THE DEFINITIVE FIX IS HERE ---
    async getEventsThisMonth(req, res) {
        try {
            // 1. Fetch all events from the database.
            const allEvents = await Event.find({});

            // 2. Get the current month and year.
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // getMonth() is 0-indexed, so we add 1.
            const currentYear = now.getFullYear();

            // 3. Filter the events in JavaScript.
            const eventsInCurrentMonth = allEvents.filter(event => {
                // Assuming the date string format is dd/mm/yyyy.
                if (typeof event.eDate !== 'string') return false;
                
                const parts = event.eDate.split('/');
                if (parts.length !== 3) return false; // Skip if format is wrong.

                const month = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);
                
                // 4. Check if the event's month and year match the current month and year.
                return month === currentMonth && year === currentYear;
            });

            // 5. Send the count of the filtered events.
            res.json({ eventsThisMonth: eventsInCurrentMonth.length });

        } catch (err) {
            console.error("Error fetching events this month:", err);
            res.status(500).json({ msg: "Server Error" });
        }
    },
    
    async getUserGrowth(req, res) {
        try {
            const labels = [];
            const data = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                const endOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
                
                const count = await User.countDocuments({
                    createdAt: { $gte: startOfDay, $lte: endOfDay }
                });
                
                labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                data.push(count);
            }
            res.json({ labels, data });
        } catch (err) {
            console.error("Error fetching user growth:", err);
            res.status(500).json({ msg: "Server Error" });
        }
    },
    
    async getEventPopularity(req, res) {
        try {
            const popularity = await Registration.aggregate([
                { $group: { _id: "$eventId", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 },
                { $lookup: { from: 'events', localField: '_id', foreignField: '_id', as: 'eventDetails' } },
                { $unwind: "$eventDetails" },
                { $project: { name: "$eventDetails.eName", count: 1 } }
            ]);
            res.json(popularity);
        } catch (err) {
            console.error("Error fetching event popularity:", err);
            res.status(500).json({ msg: "Server Error" });
        }
    },

     // --- NEW FUNCTION ADDED HERE ---
    async getDetailedEventsThisMonth(req, res) {
        try {
            const allEvents = await Event.find({});
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();

            const eventsInCurrentMonth = allEvents.filter(event => {
                if (typeof event.eDate !== 'string') return false;
                const parts = event.eDate.split('/');
                if (parts.length !== 3) return false;
                const month = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);
                return month === currentMonth && year === currentYear;
            });
            
            // Return the full details of the filtered events
            res.json(eventsInCurrentMonth);

        } catch (err) {
            console.error("Error fetching detailed events this month:", err);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    async getRecentEvents(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const recentEvents = await Event.find().sort({ _id: -1 }).limit(limit);
            res.json(recentEvents);
        } catch (err) {
            console.error("Error fetching recent events:", err);
            res.status(500).json({ msg: "Server Error" });
        }
    }
};