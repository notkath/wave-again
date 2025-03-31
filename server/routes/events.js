const express = require("express");
const router = express.Router();
const Event = require("../models/Events");

// Register for an event using name
router.post("/:id/register", async (req, res) => {
    try {
        console.log("Incoming Request Body:", req.body); // Debugging line

        const eventId = req.params.id;
        const { name } = req.body; // Extract name from request body

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (event.participants.includes(name)) {
            return res.status(400).json({ message: "User is already registered for this event" });
        }

        event.participants.push(name);
        await event.save();

        res.status(200).json({ message: "Registered successfully!", participants: event.participants });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server erroreee", error: error.message });
    }
});

module.exports = router;
