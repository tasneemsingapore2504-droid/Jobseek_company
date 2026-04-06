import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyApplications() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const fetchApps = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications/company",
        authHeaders,
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
        { status },
        authHeaders,
      );
      fetchApps();
    } catch (err) {
      console.log(err);
      alert(
        err?.response?.data?.message || "Failed to update candidate status",
      );
    }
  };

  return (
    <div className="container mt-4">
      <h3>Applications</h3>

      {apps.length === 0 ? (
        <p className="mt-3">No applications found for your company yet.</p>
      ) : (
        apps.map((app) => (
          <div key={app._id} className="card p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1">
                  {app.fname} {app.lname}
                </h5>
                <p className="mb-0 text-muted">
                  Applied for {app.apPos} at {app.cname}
                </p>
              </div>

              <span
                className={`badge ${
                  app.status === "selected"
                    ? "bg-success"
                    : app.status === "rejected"
                      ? "bg-danger"
                      : "bg-warning"
                }`}
              >
                {app.status}
              </span>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>{app.fname}</td>
                    <th>Last Name</th>
                    <td>{app.lname}</td>
                  </tr>
                  <tr>
                    <th>Mother Name</th>
                    <td>{app.mname}</td>
                    <th>Father Name</th>
                    <td>{app.faname}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{app.email}</td>
                    <th>Phone</th>
                    <td>{app.pnum}</td>
                  </tr>
                  <tr>
                    <th>Date of Birth</th>
                    <td>{app.dob ? String(app.dob).slice(0, 10) : ""}</td>
                    <th>Current City</th>
                    <td>{app.addcc}</td>
                  </tr>
                  <tr>
                    <th>Work Status</th>
                    <td>{app.addws}</td>
                    <th>Experience</th>
                    <td>{app.experience}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td colSpan="3">{app.address}</td>
                  </tr>
                  <tr>
                    <th>Resume</th>
                    <td>
                      {app.uploadRes ? (
                        <a
                          href={`http://localhost:5000/uploads/${app.uploadRes}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Resume
                        </a>
                      ) : (
                        "Not uploaded"
                      )}
                    </td>
                    <th>Other Document</th>
                    <td>
                      {app.anyDoc ? (
                        <a
                          href={`http://localhost:5000/uploads/${app.anyDoc}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Document
                        </a>
                      ) : (
                        "Not uploaded"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <button
                className="btn btn-success btn-sm"
                onClick={() => updateStatus(app._id, "selected")}
              >
                Select
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => updateStatus(app._id, "rejected")}
              >
                Reject
              </button>

              <button
                className="btn btn-primary btn-sm"
                disabled={app.status !== "selected"}
                onClick={() => navigate(`/interview/${app._id}`)}
              >
                Fill Interview Form
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CompanyApplications;
