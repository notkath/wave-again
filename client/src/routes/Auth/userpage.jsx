import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/users/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Access denied");
      }
    };

    fetchUserData();
  }, []);

  return <div>{message}</div>;
};

export default UserPage;