// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function CompanyJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     requirement: "",
//     qualification: "",
//     skills: "",
//     salary: "",
//     jobType: "",
//     lastDate: "",
//     workMode: "",
//     country: "",
//     state: "",
//     city: "",
//     link: "",
//   });

//   const token = localStorage.getItem("token");

//   const API = "http://localhost:5000/api/jobs";

//   /* ================= FETCH MY JOBS ================= */

//   const fetchJobs = async () => {
//     const res = await axios.get(`${API}/company`, {
//       headers: { Authorization: token },
//     });
//     setJobs(res.data);
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   /* ================= HANDLE CHANGE ================= */

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   /* ================= CREATE JOB ================= */

//   const createJob = async () => {
//     if (form._id) {
//       await axios.put(`${API}/${form._id}`, form, {
//         headers: { Authorization: token },
//       });
//     } else {
//       await axios.post(API, form, {
//         headers: { Authorization: token },
//       });
//     }

//     fetchJobs();

//     setForm({
//       title: "",
//       description: "",
//       requirement: "",
//       qualification: "",
//       skills: "",
//       salary: "",
//       jobType: "",
//       lastDate: "",
//       workMode: "",
//       country: "",
//       state: "",
//       city: "",
//       link: "",
//     });
//   };

//   /* ================= DELETE ================= */

//   const deleteJob = async (id) => {
//     await axios.delete(`${API}/${id}`, {
//       headers: { Authorization: token },
//     });
//     fetchJobs();
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Post a Job</h2>

//       {/* FORM */}
//       <div className="card p-3 mb-4">
//         <input
//           name="title"
//           placeholder="Title"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="description"
//           placeholder="Description"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="requirement"
//           placeholder="Requirement"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="qualification"
//           placeholder="Qualification"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="skills"
//           placeholder="Skills"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="salary"
//           placeholder="Salary"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="jobType"
//           placeholder="Job Type"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="lastDate"
//           placeholder="Last Date"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="workMode"
//           placeholder="Work Mode"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="country"
//           placeholder="Country"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="state"
//           placeholder="State"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="city"
//           placeholder="City"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="link"
//           placeholder="Apply Link"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />

//         <button className="btn btn-success" onClick={createJob}>
//           Submit Job (Pending Approval)
//         </button>
//       </div>

//       {/* JOB LIST */}
//       <h3>My Jobs</h3>

//       {jobs.map((job) => (
//         <div key={job._id} className="card p-3 mb-2">
//           <h5>{job.title}</h5>
//           <p>{job.description}</p>

//           <span
//             className={`badge ${
//               job.status === "approved"
//                 ? "bg-success"
//                 : job.status === "rejected"
//                   ? "bg-danger"
//                   : "bg-warning"
//             }`}
//           >
//             {job.status}
//           </span>
//           <button
//             className="btn btn-warning mt-2 me-2"
//             onClick={() => setForm(job)}
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-danger mt-2"
//             onClick={() => deleteJob(job._jid)}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

const initialForm = {
  title: "",
  description: "",
  requirement: "",
  qualification: "",
  skills: "",
  salary: "",
  jobType: "",
  lastDate: "",
  workMode: "",
  country: "",
  state: "",
  city: "",
  link: "",
};

export default function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(initialForm);

  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api/jobs";

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/company`, authHeaders);
      setJobs(res.data);
    } catch (error) {
      console.log("Fetch jobs error:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createJob = async () => {
    try {
      if (form._id) {
        await axios.put(`${API}/${form._jid}`, form, authHeaders);
        alert("Job updated successfully and moved back to pending.");
      } else {
        await axios.post(API, form, authHeaders);
        alert("Job submitted successfully and sent for approval.");
      }

      await fetchJobs();
      setForm(initialForm);
    } catch (error) {
      console.log("Submit job error:", error);
      alert(
        error?.response?.data?.message ||
          "Job submission failed. Please try again.",
      );
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, authHeaders);
      alert("Job deleted successfully.");
      await fetchJobs();
    } catch (error) {
      console.log("Delete job error:", error);
      alert(
        error?.response?.data?.message ||
          "Job delete failed. Please try again.",
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2>Post a Job</h2>

      <div className="card p-3 mb-4">
        <input
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="requirement"
          value={form.requirement}
          placeholder="Requirement"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="qualification"
          value={form.qualification}
          placeholder="Qualification"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="skills"
          value={form.skills}
          placeholder="Skills"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="salary"
          value={form.salary}
          placeholder="Salary"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="jobType"
          value={form.jobType}
          placeholder="Job Type"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="lastDate"
          type="date"
          value={form.lastDate}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="workMode"
          value={form.workMode}
          placeholder="Work Mode"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="country"
          value={form.country}
          placeholder="Country"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="state"
          value={form.state}
          placeholder="State"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="city"
          value={form.city}
          placeholder="City"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="link"
          value={form.link}
          placeholder="Apply Link"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button type="button" className="btn btn-success" onClick={createJob}>
          {form._id ? "Update Job" : "Submit Job (Pending Approval)"}
        </button>
      </div>

      <h3>My Jobs</h3>

      {jobs.map((job) => (
        <div key={job._id} className="card p-3 mb-2">
          <h5>{job.title}</h5>
          <p>{job.description}</p>

          <span
            className={`badge ${
              job.status === "approved"
                ? "bg-success"
                : job.status === "rejected"
                  ? "bg-danger"
                  : "bg-warning"
            }`}
          >
            {job.status}
          </span>

          <button
            type="button"
            className="btn btn-warning mt-2 me-2"
            onClick={() => setForm(job)}
          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => deleteJob(job._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
