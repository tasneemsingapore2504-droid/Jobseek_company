import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function InterviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    cname: "",
    intDate: "",
    intTime: "",
    intPlace: "",
    candidateName: "",
    apPos: "",
    selection: "selected",
  });

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/applications/${id}`,
          authHeaders,
        );

        setApplication(res.data);
        setForm((current) => ({
          ...current,
          cname: res.data.cname || "",
          candidateName:
            `${res.data.fname || ""} ${res.data.lname || ""}`.trim(),
          apPos: res.data.apPos || "",
        }));
      } catch (err) {
        console.log(err);
        alert(err?.response?.data?.message || "Unable to load application");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleSubmit = async () => {
    if (!application) return;

    setSaving(true);

    try {
      await axios.post(
        "http://localhost:5000/api/interview",
        {
          applicationId: application._id,
          cname: form.cname,
          intDate: form.intDate,
          intTime: form.intTime,
          intPlace: form.intPlace,
          candidateName: form.candidateName,
          apPos: form.apPos,
          selection: "selected",
        },
        authHeaders,
      );

      alert("Interview details saved successfully");
      navigate("/company/applications");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to save interview");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="container mt-4">Loading interview form...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Schedule Interview</h3>

      <input
        className="form-control mb-2"
        placeholder="Company Name"
        value={form.cname}
        onChange={(e) => setForm({ ...form, cname: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Candidate Name"
        value={form.candidateName}
        onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Applied Position"
        value={form.apPos}
        onChange={(e) => setForm({ ...form, apPos: e.target.value })}
      />

      <input
        className="form-control mb-2"
        type="date"
        value={form.intDate}
        onChange={(e) => setForm({ ...form, intDate: e.target.value })}
      />

      <input
        className="form-control mb-2"
        type="time"
        value={form.intTime}
        onChange={(e) => setForm({ ...form, intTime: e.target.value })}
      />

      <input
        className="form-control mb-3"
        placeholder="Interview Place"
        value={form.intPlace}
        onChange={(e) => setForm({ ...form, intPlace: e.target.value })}
      />

      <button
        className="btn btn-success"
        onClick={handleSubmit}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Interview"}
      </button>
    </div>
  );
}

export default InterviewForm;
