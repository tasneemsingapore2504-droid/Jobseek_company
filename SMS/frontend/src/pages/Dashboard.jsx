import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="card">
      <h1>Dashboard</h1>
      <p>Welcome to the Student Management System.</p>
      <Link className="button-link" to="/students">
        Manage Students
      </Link>
    </div>
  );
};

export default Dashboard;
