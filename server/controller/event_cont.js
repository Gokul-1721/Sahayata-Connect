const Event = require("../db/eventdb");

module.exports = {
    async addEvent(req, res) {
        // This function remains the same
        try {
            if (!req.files || !req.files.eImage) {
                return res.status(400).json({ msg: "No image uploaded" });
            }
            var imgobj = req.files.eImage;
            imgobj.mv("./public/event_img/" + imgobj.name, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ msg: "Error uploading image" });
                }
                var ins = {
                    eName: req.body.eName,
                    eDate: req.body.eDate,
                    eImage: imgobj.name,
                    eVenue: req.body.eVenue,
                    eDetails: req.body.eDetails
                };
                await Event.create(ins);
                res.json({ msg: "Event Added" });
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    // --- THE FIX IS HERE ---
    // This function is now equipped to handle search queries.
    async selectEvent(req, res) {
        try {
            const { query } = req.query; // Check for a 'query' parameter
            let searchFilter = {};

            if (query) {
                // If a query exists, create a case-insensitive search filter for name and details.
                const regex = new RegExp(query, 'i');
                searchFilter = {
                    $or: [
                        { eName: regex },
                        { eDetails: regex }
                    ]
                };
            }
            
            // The find method now uses the searchFilter. If no query, it's an empty object and finds all.
            const data = await Event.find(searchFilter);
            res.json(data);

        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    async selectOneEvent(req, res) {
        // This function remains the same
        try {
            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ msg: "Event not found" });
            }
            res.json(event);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    async delEvent(req, res) {
        // This function remains the same
        try {
            await Event.findByIdAndDelete(req.params.id);
            res.json({ msg: "Event Deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "Server Error" });
        }
    }
};