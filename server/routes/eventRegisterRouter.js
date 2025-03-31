const express = require("express");
const router = express.Router();
const { registerForEvent, unregisterFromEvent } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure authentication


// Register for an event (Only users with role "user")
router.post("/api/events/:eventId/register", authMiddleware, registerForEvent);

// Unregister from an event
router.post("/api/events/:eventId/unregister", authMiddleware, unregisterFromEvent);

module.exports = router;
