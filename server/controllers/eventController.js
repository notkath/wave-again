const Event = require("../models/EventModel");
const User = require("../models/UserModel");

const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Ensure user is authenticated and has a role of "user"
        if (!req.user || req.user.role !== "user") {
            return res.status(403).json({ message: "Only users can register for events" });
        }

        const userId = req.user._id; // Extract user ID from authenticated user

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if the user is already registered
        if (event.participants.includes(userId)) {
            return res.status(400).json({ message: "User already registered" });
        }

        // Register the user for the event
        event.participants.push(userId);
        await event.save();

        res.status(200).json({ message: "User successfully registered for the event" });

    } catch (error) {
        res.status(500).json({ message: "Error registering for the event", error: error.message });
    }
};

module.exports = { registerForEvent };
const unregisterFromEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Ensure user is authenticated and has a role of "user"
        if (!req.user || req.user.role !== "user") {
            return res.status(403).json({ message: "Only users can unregister from events" });
        }

        const userId = req.user._id; // Extract user ID from authenticated user

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if the user is registered
        if (!event.participants.includes(userId)) {
            return res.status(400).json({ message: "User is not registered for this event" });
        }

        // Remove user from participants
        event.participants = event.participants.filter(id => id.toString() !== userId.toString());
        await event.save();

        res.status(200).json({ message: "User successfully unregistered from the event" });

    } catch (error) {
        res.status(500).json({ message: "Error unregistering from the event", error: error.message });
    }
};

module.exports = { registerForEvent, unregisterFromEvent };
