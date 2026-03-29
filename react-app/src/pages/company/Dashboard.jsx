import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("DASHBOARD LOADED");

    // 🔥 Step 1: Get token from URL (for cross-app login)
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    const userFromUrl = params.get("user");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      console.log("Token received from URL:", tokenFromUrl);
    }

    if (userFromUrl) {
      const parsedUser = JSON.parse(decodeURIComponent(userFromUrl));
      localStorage.setItem("user", JSON.stringify(parsedUser));
      console.log("User saved", parsedUser);
    }

    // 🔥 Step 2: Get token + user from localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    console.log("Token in dashboard:", token);
    console.log("User in dashboard:", userData);

    // 🔥 Step 3: Validate
    if (!token || !userData) {
      window.location.replace("http://localhost:5173/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);

      if (parsedUser.role !== "recruiter") {
        window.location.replace("http://localhost:5173/login");
        return;
      }

      setUser(parsedUser);
    } catch (err) {
      console.log("User parse error:", err);
      window.location.replace("http://localhost:5173/login");
      return;
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* SIDEBAR */}
        <div className="col-md-2 bg-dark text-white vh-100 p-3">
          <h4 className="text-center mb-4">Company Panel</h4>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button className="nav-link text-white btn btn-link text-start">
                🏠 Home
              </button>
            </li>

            <li className="nav-item mb-2">
              <button
                className="nav-link text-white btn btn-link text-start"
                onClick={() => (window.location.href = "/company/profile")}
              >
                🏢 Company Profile
              </button>
            </li>

            <li className="nav-item mb-2">
              <button
                className="nav-link text-white btn btn-link text-start"
                onClick={() => (window.location.href = "/company/jobs")}
              >
                💼 Jobs
              </button>
            </li>

            <li className="nav-item mb-2">
              <button
                className="nav-link text-white btn btn-link text-start"
                onClick={() => (window.location.href = "/company/applications")}
              >
                🧑‍💼 Applications
              </button>
            </li>

            <li className="nav-item mb-2">
              <button className="nav-link text-white btn btn-link text-start">
                📅 Interviews
              </button>
            </li>
          </ul>

          {/* LOGOUT */}
          <button
            className="btn btn-danger w-100 mt-4"
            onClick={() => {
              localStorage.clear();
              window.location.replace("http://localhost:5173/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* MAIN */}
        <div className="col-md-10 p-4">
          <h2 className="mb-4">Dashboard</h2>

          <div className="card shadow p-4">
            <h4>Welcome, {user?.name}</h4>
            <p className="text-muted">
              Manage your jobs, candidates, and interviews from here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
