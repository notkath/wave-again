import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleEvent = () => {
  const { id } = useParams();
  const baseUrl = `http://localhost:8000/api/events/${id}`;

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

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

  const handleRegister = async () => {
    if (!name.trim()) {
        setMessage("Please enter your name.");
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-user-id": name,  // Ensure the backend expects user ID in headers
            },
            body: JSON.stringify({ name }), // Send `name` in body
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Registration failed");

        setMessage("Successfully registered!");
        setEvent((prevEvent) => ({
            ...prevEvent,
            participants: [...prevEvent.participants, name],
        }));
        setName("");
    } catch (err) {
        console.error("Registration Error:", err);  // ✅ This will show the actual error
        setMessage(err.message || "An unknown error occurred.");
    }
};


  // return (
  //   <div className="event-detail">
  //     <Link to="/events">⬅ Back to Events</Link>

  //     {isLoading ? (
  //       <p>Loading event details...</p>
  //     ) : error ? (
  //       <p className="error">{error}</p>
  //     ) : (
  //       <div className="event-card">
  //         <h2>{event.title}</h2>
  //         <p>{event.description}</p>
  //         <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
  //         <p><strong>Location:</strong> {event.location}</p>
  //         <p><strong>Created At:</strong> {new Date(event.createdAt).toLocaleString()}</p>

  //         <input
  //           type="text"
  //           placeholder="Enter your name"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //         />
  //         <button onClick={handleRegister} className="register-btn">
  //           Register for Event
  //         </button>

  //         {message && <p className="message">{message}</p>}

  //         <h3>Participants:</h3>
  //         <ul>
  //           {event.participants.length > 0 ? (
  //             event.participants.map((participant, index) => (
  //               <li key={index}>{participant}</li>
  //             ))
  //           ) : (
  //             <p>No participants yet.</p>
  //           )}
  //         </ul>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="event-detail-container">
      <div className="back-link">
        <Link to="/events">⬅ Back to Events</Link>
      </div>
  
      {isLoading ? (
        <p className="info-message">Loading event details...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="event-detail-card">
          <h2 className="event-title">{event.title}</h2>
          <p className="event-description">{event.description}</p>
          <p className="event-meta"><strong>Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
          <p className="event-meta"><strong>Location:</strong> {event.location}</p>
          <p className="event-meta"><strong>Created At:</strong> {new Date(event.createdAt).toLocaleString()}</p>
  
          <div className="register-section">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="register-input"
            />
            <button onClick={handleRegister} className="register-btn">
              Register for Event
            </button>
          </div>
  
          {message && <p className="info-message">{message}</p>}
  
          <div className="participants-section">
            <h3>Participants:</h3>
            <ul className="participants-list">
              {event.participants.length > 0 ? (
                event.participants.map((participant, index) => (
                  <li key={index}>{participant}</li>
                ))
              ) : (
                <p>No participants yet.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default SingleEvent;
