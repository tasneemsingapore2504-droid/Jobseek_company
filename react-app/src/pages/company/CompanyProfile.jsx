import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyProfile = () => {
  const [form, setForm] = useState({
    cname: "",
    website: "",
    cemail: "",
    cpnum: "",
    address: "",
    csize: "",
    branch: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const [profileExists, setProfileExists] = useState(false);

  const token = localStorage.getItem("token");

  // 🔥 Fetch profile
  const fetchProfile = async () => {
    try {
      const companyId = JSON.parse(
        localStorage.getItem("companyProfile"),
      )?.companyId;
      const res = await axios.get(
        `http://localhost:5000/api/companyprofile/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log("FETCHED PROFILE:", res.data);

      if (res.data) {
        localStorage.setItem("companyProfile", JSON.stringify(res.data));
        setForm({
          cname: res.data?.cname || "",
          website: res.data?.website || "",
          cemail: res.data?.cemail || "",
          cpnum: res.data?.cpnum || "",
          address: res.data?.address || "",
          csize: res.data?.csize || "",
          branch: res.data?.branch || "",
        });
        setProfileExists(true);
      } else {
        setProfileExists(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Save / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const companyId = JSON.parse(
        localStorage.getItem("companyProfile"),
      )?.companyId;

      let res;

      if (profileExists) {
        // 🔥 UPDATE (PUT)
        res = await axios.put(
          `http://localhost:5000/api/companyprofile/${companyId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        alert("Profile updated");
      } else {
        // 🔥 CREATE (POST)
        res = await axios.post(
          `http://localhost:5000/api/companyprofile`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        alert("Profile created");
      }

      console.log("RESPONSE:", res.data);

      // ✅ Always sync latest data
      localStorage.setItem("companyProfile", JSON.stringify(res.data));

      setForm(res.data);
      setProfileExists(true);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/companyprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile deleted");
      setForm({
        cname: "",
        website: "",
        cemail: "",
        cpnum: "",
        address: "",
        csize: "",
        branch: "",
      });
      setProfileExists(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Company Profile</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="cname"
          value={form.cname || ""}
          onChange={handleChange}
          placeholder="Company Name"
          className="form-control mb-2"
        />

        <input
          name="website"
          value={form.website || ""}
          onChange={handleChange}
          placeholder="Website"
          className="form-control mb-2"
        />

        <input
          name="cemail"
          value={form.cemail || ""}
          onChange={handleChange}
          placeholder="Email"
          className="form-control mb-2"
        />

        <input
          name="cpnum"
          value={form.cpnum || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="form-control mb-2"
        />

        <input
          name="address"
          value={form.address || ""}
          onChange={handleChange}
          placeholder="Address"
          className="form-control mb-2"
        />

        <input
          name="csize"
          value={form.csize || ""}
          onChange={handleChange}
          placeholder="Company Size"
          className="form-control mb-2"
        />

        <input
          name="branch"
          value={form.branch || ""}
          onChange={handleChange}
          placeholder="Branch Details"
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-primary">
          {profileExists ? "Update" : "Create"} Profile
        </button>
      </form>

      {profileExists && (
        <div className="mt-4">
          <h4>Company Profile Details</h4>

          <table className="table table-bordered table-striped table-hover">
            <tbody>
              <tr>
                <th>Company Name</th>
                <td>{form.cname}</td>
              </tr>
              <tr>
                <th>Website</th>
                <td>{form.website}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{form.cemail}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{form.cpnum}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{form.address}</td>
              </tr>
              <tr>
                <th>Company Size</th>
                <td>{form.csize}</td>
              </tr>
              <tr>
                <th>Branch</th>
                <td>{form.branch}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {profileExists && (
        <button className="btn btn-danger mt-3" onClick={handleDelete}>
          Delete Profile
        </button>
      )}
    </div>
  );
};

export default CompanyProfile;
