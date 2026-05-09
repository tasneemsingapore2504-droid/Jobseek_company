import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/studentService";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    age: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createStudent({
        ...formData,
        age: formData.age ? Number(formData.age) : undefined
      });
      navigate("/students");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not create student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card auth-card">
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Student"}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
