import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, taskSummary, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>👤 Profile</h2>

      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <h3>📌 Task Summary</h3>
          <p>✅ Completed: {taskSummary.completed}</p>
          <p>⏳ Pending: {taskSummary.pending}</p>
          <p>❌ Incomplete: {taskSummary.incomplete}</p>
          <button className="btn btn-danger" onClick={() => logout(navigate)}>Logout</button>
        </div>
      ) : (
        <p>⚠️ No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
