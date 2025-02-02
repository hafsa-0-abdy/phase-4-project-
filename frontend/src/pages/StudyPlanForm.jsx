import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const StudyPlanForm = () => {
  const { addStudyPlan } = useContext(UserContext);
  const [formData, setFormData] = useState({ subject: "", date: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudyPlan(formData);
    setFormData({ subject: "", date: "" }); // ✅ Clear form after submission
  };

  return (
    <div>
      <h3>📝 Add Study Plan</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <button type="submit">Add Study Plan</button>
      </form>
    </div>
  );
};

export default StudyPlanForm;
