import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleEvent = () => {
  const { id } = useParams(); // Get event ID from URL
  const baseUrl = `http://localhost:8000/api/events/${id}`;
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error("Event not found");

        const eventData = await response.json();
        setEvent(eventData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <div className="event-detail">
      <Link to="/events">⬅ Back to Events</Link>

      {isLoading ? (
        <p>Loading event details...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="event-card">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Created At:</strong> {new Date(event.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default SingleEvent;
