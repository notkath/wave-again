// EventRegistrationButton.js
import React, { useState, useEffect } from "react";

const EventRegistrationButton = ({ eventId }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    if (userRole === "user") checkRegistrationStatus();
  }, [eventId]);

  const checkRegistrationStatus = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/events/${eventId}`);
      if (!response.ok) throw new Error("Failed to fetch event");
      
      const data = await response.json();
      setIsRegistered(data.participants.includes(userId));
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  };

  const handleRegistration = async () => {
    if (!canRegister) {
        setMessage("Only registered users can participate in events.");
        return;
    }

    setIsLoading(true);
    setMessage("");

    try {
        const endpoint = isRegistered
            ? `http://localhost:8000/api/events/${eventId}/unregister`
            : `http://localhost:8000/api/events/${eventId}/register`;

        const userId = localStorage.getItem("userId");

        if (!userId) {
            setMessage("User ID not found. Please log in.");
            setIsLoading(false);
            return;
        }

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "X-User-Id": userId // Fix the header name
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            setMessage(errorData.message || "Error processing request.");
            return;
        }

        setIsRegistered(!isRegistered);
        setMessage(isRegistered ? "Unregistered successfully." : "Registered successfully.");
    } catch (error) {
        console.error("Error processing request:", error);
        setMessage("Error processing request.");
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div>
      {message && <p className={message.includes("Error") ? "text-red-500" : "text-green-500"}>{message}</p>}
      <button
        onClick={handleRegistration}
        disabled={isLoading}
        className={`p-2 rounded text-white ${isRegistered ? "bg-red-500" : "bg-blue-500"}`}
      >
        {isLoading ? "Processing..." : isRegistered ? "Unregister" : "Register"}
      </button>
    </div>
  );
};

export default EventRegistrationButton;
