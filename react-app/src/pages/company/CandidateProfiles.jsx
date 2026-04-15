import React, { useEffect, useState } from "react";
import axios from "axios";

function CandidateProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const fetchProfiles = async (searchValue = "") => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/company/candidateprofiles${
          searchValue ? `?search=${encodeURIComponent(searchValue)}` : ""
        }`,
        authHeaders,
      );

      setProfiles(res.data);
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message || "Failed to fetch candidate profiles",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSearch = () => {
    fetchProfiles(search);
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Candidate Profiles</h2>

      <div className="card p-3 mb-4">
        <label className="form-label">
          Search By Qualification, Skills Or Experience
        </label>
        <div className="d-flex gap-2 flex-wrap">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. B.Tech, React, Java, MBA, 2 years"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setSearch("");
              fetchProfiles("");
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading candidate profiles...</p>
      ) : profiles.length === 0 ? (
        <p>No candidate profiles found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Mother Name</th>
                <th>Father Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Date Of Birth</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Qualification</th>
                <th>Percentage</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>City</th>
                <th>University</th>
                <th>Certificates</th>
                <th>Resume</th>
                <th>Documents</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile._id}>
                  <td>{profile.fname || ""}</td>
                  <td>{profile.lname || ""}</td>
                  <td>{profile.gender || ""}</td>
                  <td>{profile.mname || ""}</td>
                  <td>{profile.faname || ""}</td>
                  <td>{profile.email || ""}</td>
                  <td>{profile.phone || ""}</td>
                  <td>{profile.age || ""}</td>
                  <td>{profile.dob ? String(profile.dob).slice(0, 10) : ""}</td>
                  <td>{profile.address || ""}</td>
                  <td>{profile.pincode || ""}</td>
                  <td>{profile.qualification || ""}</td>
                  <td>{profile.percentage || ""}</td>
                  <td>{profile.skills || ""}</td>
                  <td>{profile.experience || ""}</td>
                  <td>{profile.city || ""}</td>
                  <td>{profile.university || ""}</td>
                  <td>{profile.certificates || ""}</td>
                  <td>
                    {profile.resumeUrl ? (
                      <a
                        href={`http://localhost:5000${profile.resumeUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Resume
                      </a>
                    ) : (
                      "Not uploaded"
                    )}
                  </td>

                  <td>
                    {profile.documentUrl ? (
                      <a
                        href={`http://localhost:5000${profile.documentUrl}`}
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CandidateProfiles;
