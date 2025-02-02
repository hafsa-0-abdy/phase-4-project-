import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const StudyPlans = () => {
  const { studyPlans } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>📚 Your Study Plans</h2>
      {studyPlans.length === 0 ? (
        <p>No study plans available.</p>
      ) : (
        <ul>
          {studyPlans.map((plan) => (
            <li key={plan.id}>
              <strong>{plan.subject}</strong> - {plan.date}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/tasks")}>Continue to Tasks</button>
    </div>
  );
};

export default StudyPlans;
