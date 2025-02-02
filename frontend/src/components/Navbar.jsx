import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  console.log("Navbar User State:", user); // 🔍 Debugging

  const handleLogout = () => {
    console.log("🛑 Logout Button Clicked!"); // ✅ Debugging
    logout(navigate);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">📚 Student Productivity</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/progress">Progress</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/study-plans">Study Plans</Link>
            </li> */}

            {user ? (
              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
