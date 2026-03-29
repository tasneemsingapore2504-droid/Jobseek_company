import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function InterviewForm() {
  const { id } = useParams();

  const [form, setForm] = useState({
    InterviewDate: "",
    InterviewTime: "",
    InterviewPlace: "",
    Selection: "pending",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/InterviewForm",
        {
          intDate: form.InterviewDate,
          intTime: form.InterviewTime,
          intPlace: form.InterviewPlace,
          applicationId: id,
          companyId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Interview Scheduled");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Schedule Interview</h3>

      <input
        className="form-control mb-2"
        type="date"
        onChange={(e) => setForm({ ...form, InterviewDate: e.target.value })}
      />

      <input
        className="form-control mb-2"
        type="time"
        onChange={(e) => setForm({ ...form, InterviewTime: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Place"
        onChange={(e) => setForm({ ...form, InterviewPlace: e.target.value })}
      />

      <button className="btn btn-success" onClick={handleSubmit}>
        Save Interview
      </button>
    </div>
  );
}

export default InterviewForm;
