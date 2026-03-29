import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyApplications() {
  const [apps, setApps] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const fetchApps = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/company/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setApps(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/applications/status/${id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      fetchApps();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Applications</h3>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {apps.map((app) => (
            <tr key={app._id}>
              <td>
                {app.fname} {app.lname}
              </td>
              <td>{app.apPos}</td>

              <td>
                <a
                  href={`http://localhost:5000/uploads/${app.uploadRes}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </td>

              <td>
                <span
                  className={`badge ${
                    app.status === "shortlisted"
                      ? "bg-success"
                      : app.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning"
                  }`}
                >
                  {app.status}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(app._id, "shortlisted")}
                >
                  Shortlist
                </button>

                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => updateStatus(app._id, "rejected")}
                >
                  Reject
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/interview/${app._id}`)}
                >
                  Interview
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyApplications;
