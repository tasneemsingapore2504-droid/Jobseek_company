import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-title">Student Management</div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/students">Students</Link>
        <button type="button" onClick={handleLogout} className="link-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
