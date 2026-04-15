import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    try {
      setUser(userData ? JSON.parse(userData) : null);
    } catch (err) {
      console.log("User parse error:", err);
      setUser(null);
    }
  }, []);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="card shadow p-4">
        <h4>Welcome, {user?.name}</h4>
        <p className="text-muted">
          Manage your jobs, candidates, and interviews from here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
