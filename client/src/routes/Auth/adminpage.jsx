import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/users/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Access denied");
      }
    };

    fetchAdminData();
  }, []);

  return <div>{message}</div>;
};

export default AdminPage;