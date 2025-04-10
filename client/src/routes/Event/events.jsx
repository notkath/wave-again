import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const baseUrl = "http://localhost:8000/api/events";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        if (isMounted) {
          setError("Error fetching data. Try again.");
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Convert date to "YYYY-MM-DD" format for comparison
  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  // Get unique locations from event data
  const locations = [...new Set(data.map(event => event?.location))];

  // Filter events based on selected date and location
  const filteredEvents = data.filter(event => {
    const matchesDate = selectedDate ? formatDate(event?.start) === selectedDate : true;
    const matchesLocation = selectedLocation ? event?.location === selectedLocation : true;
    return matchesDate && matchesLocation;
  });

  // return (
  //   <div>
  //     <h2>Events</h2>
  //     <Link to="/createevent">Create Event</Link>
  //     {/* Filters */}
  //     <div className="filters">
  //       {/* Date Filter */}
  //       <label>Select Date:</label>
  //       <input 
  //         type="date" 
  //         value={selectedDate} 
  //         onChange={(e) => setSelectedDate(e.target.value)}
  //       />
  //       <button onClick={() => setSelectedDate("")}>All Events</button>
  //       <br></br>

  //       {/* Location Filter */}
  //       <label>Select Location:</label>
  //       <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
  //         <option value="">All Locations</option>
  //         {locations.map((location, index) => (
  //           <option key={index} value={location}>{location}</option>
  //         ))}
  //       </select>
  //     </div>

  //     {/* Loading & Error Messages */}
  //     {isLoading && <p>Loading...</p>}
  //     {error && <p className="error">{error}</p>}

  //     {/* Event List */}
  //     <ul className="event-list">
  //       {filteredEvents.length > 0 ? (
  //         filteredEvents.map((event) => (
  //           <li key={event?._id} className="event-item">
  //             <Link to={`/events/${event?._id}`}>
  //               <h3>{event?.title}</h3>
  //               <p>{event?.description}</p>
  //               <p><strong>Date:</strong> {new Date(event?.start).toLocaleDateString()}</p>
  //               <p><strong>Location:</strong> {event?.location}</p>
  //             </Link>
  //           </li>
  //         ))
  //       ) : (
  //         <p>No events found for the selected filters.</p>
  //       )}
  //     </ul>
  //   </div>
  // );
  return (
    <div className="events-container">
      <h2 className="events-title">Events</h2>
  
      <div className="create-event-link">
        <Link to="/createevent">Create Event</Link>
      </div>
  
      {/* Filters */}
      <div className="filters-section">
        {/* Date Filter */}
        <div className="filter-group">
          <label className="filter-label">Select Date:</label>
          <input 
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="filter-input"
          />
          <button onClick={() => setSelectedDate("")} className="filter-button">
            All Events
          </button>
        </div>
  
        {/* Location Filter */}
        <div className="filter-group">
          <label className="filter-label">Select Location:</label>
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="filter-input"
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
  
      {/* Loading & Error Messages */}
      {isLoading && <p className="info-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
  
      {/* Event List */}
      <ul className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li key={event?._id} className="event-item">
              <Link to={`/events/${event?._id}`} className="event-link">
                <h3 className="event-title">{event?.title}</h3>
                <p className="event-description">{event?.description}</p>
                <p className="event-meta"><strong>Date:</strong> {new Date(event?.start).toLocaleDateString()}</p>
                <div className="event-meta-loc"><strong>Location:</strong> {event?.location}</div>
              </Link>
            </li>
          ))
        ) : (
          <p className="info-message">No events found for the selected filters.</p>
        )}
      </ul>
    </div>
  );
  
};

export default Events;
