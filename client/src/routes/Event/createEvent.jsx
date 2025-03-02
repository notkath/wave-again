import React, { useState } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Event created successfully!");
        setFormData({
          title: "",
          description: "",
          start: "",
          end: "",
          location: "",
        });
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Failed to create event. Try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a New Event</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
