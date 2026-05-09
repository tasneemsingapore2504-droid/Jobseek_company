import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteStudent, getStudents } from "../services/studentService";
import StudentTable from "../components/StudentTable";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    setLoading(true);

    try {
      const response = await getStudents();
      const studentsData = response.data?.data || [];
      setStudents(studentsData);
      setError("");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="card">
      <div className="heading-row">
        <h1>Students</h1>
        <Link className="button-link" to="/students/add">
          Add Student
        </Link>
      </div>

      {loading && <p>Loading students...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && students.length === 0 && <p>No students found.</p>}

      {!loading && students.length > 0 && <StudentTable students={students} onDelete={handleDelete} />}
    </div>
  );
};

export default Students;
