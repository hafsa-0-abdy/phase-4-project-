import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const StudyPlans = () => {
  const { studyPlans, fetchStudyPlans, addStudyPlan } = useContext(UserContext);
  const [formData, setFormData] = useState({ subject: "", date: "" });

  useEffect(() => {
    fetchStudyPlans(); // ✅ Ensure study plans are fetched on page load
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudyPlan(formData);
    setFormData({ subject: "", date: "" }); // ✅ Clear form after adding
  };

  return (
    <div>
      <h2>📚 Your Study Plans</h2>

      {/* ✅ Study Plan Form */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <button type="submit">Add Study Plan</button>
      </form>

      {/* ✅ Display Study Plans */}
      {studyPlans && studyPlans.length > 0 ? (
        <ul>
          {studyPlans.map((plan) => (
            <li key={plan.id}>
              <strong>{plan.subject}</strong> - {plan.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>📌 No study plans available. Add some!</p>
      )}
    </div>
  );
};

export default StudyPlans;
