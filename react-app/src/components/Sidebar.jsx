import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `nav-link text-white btn btn-link text-start w-100 ${
    isActive ? "fw-bold text-warning" : ""
  }`;

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("companyProfile");
    window.location.replace("http://localhost:5173/login");
  };

  return (
    <aside className="col-md-3 col-lg-2 bg-dark text-white min-vh-100 p-3">
      <h4 className="text-center mb-4">Company Panel</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink to="/company/dashboard" className={linkClass}>
            Home
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/company/profile" className={linkClass}>
            Company Profile
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/company/jobs" className={linkClass}>
            Jobs
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/company/applications" className={linkClass}>
            Applications
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <button
            type="button"
            className="nav-link text-white btn btn-link text-start w-100"
            onClick={() => navigate("/company/applications")}
          >
            Interviews
          </button>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/company/candidate-profiles" className={linkClass}>
            Candidate Profiles
          </NavLink>
        </li>
      </ul>

      <button
        type="button"
        className="btn btn-danger w-100 mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
