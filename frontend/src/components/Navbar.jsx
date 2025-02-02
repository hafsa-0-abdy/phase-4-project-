import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  console.log("Navbar User State:", user);

  const handleLogout = () => {
    console.log("🛑 Logout Button Clicked!");
    logout(navigate);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="logo" to="/">📚 Student Productivity</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/progress">Progress</Link></li>
          <li><Link to="/study-plans">Study Plans</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        <div className="auth-buttons">
          {user ? (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link className="login-btn" to="/login">Login</Link>
              <Link className="register-btn" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
