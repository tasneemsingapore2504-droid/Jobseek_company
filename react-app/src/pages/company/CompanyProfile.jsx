import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyForm = {
  cname: "",
  website: "",
  cemail: "",
  cpnum: "",
  address: "",
  csize: "",
  branch: "",
};

const normalizeProfile = (profile = {}) => ({
  cname: profile?.cname || "",
  website: profile?.website || "",
  cemail: profile?.cemail || "",
  cpnum: profile?.cpnum || "",
  address: profile?.address || "",
  csize: profile?.csize || "",
  branch: profile?.branch || "",
});

const CompanyProfile = () => {
  const [form, setForm] = useState(emptyForm);
  const [profileExists, setProfileExists] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchProfile = async () => {
    if (!token || !user?.id) {
      localStorage.removeItem("companyProfile");
      setForm(emptyForm);
      setProfileExists(false);
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:5000/api/companyprofile",
        authHeaders,
      );

      if (res.data) {
        localStorage.setItem("companyProfile", JSON.stringify(res.data));
        setForm(normalizeProfile(res.data));
        setProfileExists(true);
      } else {
        localStorage.removeItem("companyProfile");
        setForm(emptyForm);
        setProfileExists(false);
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("companyProfile");
      setForm(emptyForm);
      setProfileExists(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = profileExists
        ? await axios.put(
            `http://localhost:5000/api/companyprofile/${user.id}`,
            form,
            authHeaders,
          )
        : await axios.post(
            "http://localhost:5000/api/companyprofile",
            form,
            authHeaders,
          );

      alert(profileExists ? "Profile updated" : "Profile created");

      localStorage.setItem("companyProfile", JSON.stringify(res.data));
      setForm(normalizeProfile(res.data));
      setProfileExists(true);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Unable to save company profile");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/companyprofile/${user.id}`,
        authHeaders,
      );

      alert("Profile deleted");
      localStorage.removeItem("companyProfile");
      setForm(emptyForm);
      setProfileExists(false);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Unable to delete company profile");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Company Profile</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-label">Company Name</label>
        <input
          name="cname"
          value={form.cname}
          onChange={handleChange}
          placeholder="Company Name"
          className="form-control mb-2"
        />

        <label className="form-label">Website</label>
        <input
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="Website"
          className="form-control mb-2"
        />

        <label className="form-label">Email</label>
        <input
          name="cemail"
          value={form.cemail}
          onChange={handleChange}
          placeholder="Email"
          className="form-control mb-2"
        />

        <label className="form-label">Phone</label>
        <input
          name="cpnum"
          value={form.cpnum}
          onChange={handleChange}
          placeholder="Phone"
          className="form-control mb-2"
        />

        <label className="form-label">Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="form-control mb-2"
        />

        <label className="form-label">Company Size</label>
        <input
          name="csize"
          value={form.csize}
          onChange={handleChange}
          placeholder="Company Size"
          className="form-control mb-2"
        />

        <label className="form-label">Branch Details</label>
        <input
          name="branch"
          value={form.branch}
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
        <button
          type="button"
          className="btn btn-danger mt-3"
          onClick={handleDelete}
        >
          Delete Profile
        </button>
      )}
    </div>
  );
};

export default CompanyProfile;
