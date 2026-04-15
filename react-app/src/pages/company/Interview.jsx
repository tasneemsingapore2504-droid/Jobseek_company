import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function InterviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [existingInterview, setExistingInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [savingResult, setSavingResult] = useState(false);

  const [form, setForm] = useState({
    cname: "",
    intDate: "",
    intTime: "",
    intPlace: "",
    candidateName: "",
    apPos: "",
    selection: "selected",
  });

  const [resultForm, setResultForm] = useState({
    interviewResult: "pending",
    remarks: "",
  });

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appRes = await axios.get(
          `http://localhost:5000/api/applications/${id}`,
          authHeaders,
        );

        setApplication(appRes.data);
        setForm((current) => ({
          ...current,
          cname: appRes.data.cname || "",
          candidateName:
            `${appRes.data.fname || ""} ${appRes.data.lname || ""}`.trim(),
          apPos: appRes.data.apPos || "",
        }));

        try {
          const interviewRes = await axios.get(
            `http://localhost:5000/api/interview/application/${id}`,
            authHeaders,
          );

          setExistingInterview(interviewRes.data);
          setForm({
            cname: interviewRes.data.cname || "",
            intDate: interviewRes.data.intDate || "",
            intTime: interviewRes.data.intTime || "",
            intPlace: interviewRes.data.intPlace || "",
            candidateName: interviewRes.data.candidateName || "",
            apPos: interviewRes.data.apPos || "",
            selection: interviewRes.data.selection || "selected",
          });

          setResultForm({
            interviewResult: interviewRes.data.interviewResult || "pending",
            remarks: interviewRes.data.remarks || "",
          });
        } catch {
          // no interview saved yet
        }
      } catch (err) {
        console.log(err);
        alert(err?.response?.data?.message || "Unable to load application");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleScheduleSubmit = async () => {
    if (!application) return;

    setSavingSchedule(true);

    try {
      const res = await axios.post(
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

      setExistingInterview(res.data);
      setResultForm({
        interviewResult: res.data.interviewResult || "pending",
        remarks: res.data.remarks || "",
      });

      alert("Interview details saved successfully");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to save interview");
    } finally {
      setSavingSchedule(false);
    }
  };

  const handleResultSubmit = async () => {
    setSavingResult(true);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/interview/${id}/result`,
        {
          interviewResult: resultForm.interviewResult,
          remarks: resultForm.remarks,
        },
        authHeaders,
      );

      setExistingInterview(res.data);
      alert("Interview result saved successfully");
      navigate("/company/applications");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to save interview result");
    } finally {
      setSavingResult(false);
    }
  };

  if (loading) {
    return <div className="container mt-4">Loading interview form...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Schedule Interview</h3>

      <label className="form-label">Company Name</label>
      <input
        className="form-control mb-2"
        placeholder="Company Name"
        value={form.cname}
        onChange={(e) => setForm({ ...form, cname: e.target.value })}
      />

      <label className="form-label">Candidate Name</label>
      <input
        className="form-control mb-2"
        placeholder="Candidate Name"
        value={form.candidateName}
        onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
      />

      <label className="form-label">Applied Position</label>
      <input
        className="form-control mb-2"
        placeholder="Applied Position"
        value={form.apPos}
        onChange={(e) => setForm({ ...form, apPos: e.target.value })}
      />

      <label className="form-label">Interview Date</label>
      <input
        className="form-control mb-2"
        type="date"
        value={form.intDate}
        onChange={(e) => setForm({ ...form, intDate: e.target.value })}
      />

      <label className="form-label">Interview Time</label>
      <input
        className="form-control mb-2"
        type="time"
        value={form.intTime}
        onChange={(e) => setForm({ ...form, intTime: e.target.value })}
      />

      <label className="form-label">Interview Place</label>
      <input
        className="form-control mb-3"
        placeholder="Interview Place"
        value={form.intPlace}
        onChange={(e) => setForm({ ...form, intPlace: e.target.value })}
      />

      <button
        className="btn btn-success mb-4"
        onClick={handleScheduleSubmit}
        disabled={savingSchedule}
      >
        {savingSchedule ? "Saving..." : "Save Interview"}
      </button>

      {existingInterview && (
        <div className="card p-3">
          <h4>Interview Result / Remarks</h4>
          <p className="text-muted mb-3">
            Fill this after the candidate has given the interview.
          </p>

          <label className="form-label">Interview Result</label>
          <select
            className="form-control mb-3"
            value={resultForm.interviewResult}
            onChange={(e) =>
              setResultForm({
                ...resultForm,
                interviewResult: e.target.value,
              })
            }
          >
            <option value="pending">Pending</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>

          <label className="form-label">Further Remarks</label>
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Further remarks (optional)"
            value={resultForm.remarks}
            onChange={(e) =>
              setResultForm({
                ...resultForm,
                remarks: e.target.value,
              })
            }
          />

          <button
            className="btn btn-primary"
            onClick={handleResultSubmit}
            disabled={savingResult}
          >
            {savingResult ? "Saving..." : "Save Result"}
          </button>
        </div>
      )}
    </div>
  );
}

export default InterviewForm;
