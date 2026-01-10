const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // This links to your Event model
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This links to your User model
        required: true
    },
    userName: { // Storing name for easier access if needed
        type: String,
        required: true
    },
    eventName: { // Storing event name for easier access
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

// To prevent a user from registering for the same event multiple times
registrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
