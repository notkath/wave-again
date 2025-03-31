const dotenv= require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
const connectDB = require("./connectDB");
const Events = require("./models/Events");
const authRoutes = require("./routes/authRouter");
const userRoutes = require("./routes/userRoutes");
const jwt = require("jsonwebtoken");
const eventRoutes = require("./routes/events");


connectDB();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // Allow only this frontend URL
  credentials: true, 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/events", eventRoutes);


// Get all events
app.use('/',require('./routes/authRouter'));
app.get("/api/events", async (req, res) => {
  try {
    const events = await Events.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get event by ID
app.get("/api/events/:id", async (req, res) => {
  try {
    const idParam = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(idParam)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const event = await Events.findById(idParam);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
app.post("/api/events", async (req, res) => {
  try {
    const { title, description, start, end, location } = req.body;

    // Validate required fields
    if (!title || !description || !start || !end || !location) {
      return res.status(400).json({ message: "All fields (title, description, start, end, location) are required" });
    }

    const newEvent = new Events({
      title,
      description,
      start: new Date(start),
      end: new Date(end),
      location,
      createdAt: new Date() // Automatically set the created timestamp
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Catch-all for unknown routes
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

