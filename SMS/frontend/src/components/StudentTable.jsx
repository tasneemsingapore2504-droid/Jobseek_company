import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const StudentTable = ({ students, onDelete }) => {
  const [searchText, setSearchText] = useState("");

  const filteredStudents = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    if (!keyword) {
      return students;
    }

    return students.filter((student) => student.name.toLowerCase().includes(keyword));
  }, [students, searchText]);

  return (
    <div>
      <div className="table-toolbar">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p>No matching students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>{student.age || "-"}</td>
                <td className="actions">
                  <Link to={`/students/edit/${student._id}`}>Edit</Link>
                  <button type="button" onClick={() => onDelete(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentTable;
