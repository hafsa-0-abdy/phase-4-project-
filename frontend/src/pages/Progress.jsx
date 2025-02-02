import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Progress = () => {
  const { tasks, fetchTasks } = useContext(UserContext);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [incomplete, setIncomplete] = useState(0);

  useEffect(() => {
    fetchTasks(); // ✅ Ensure we fetch latest tasks on load
  }, []);

  useEffect(() => {
    const totalTasks = tasks.length;

    if (totalTasks === 0) {
      setCompleted(0);
      setPending(0);
      setIncomplete(0);
    } else {
      setCompleted(((tasks.filter(task => task.status === "Completed").length) / totalTasks) * 100);
      setPending(((tasks.filter(task => task.status === "Pending").length) / totalTasks) * 100);
      setIncomplete(((tasks.filter(task => task.status === "Incomplete").length) / totalTasks) * 100);
    }
  }, [tasks]);

  return (
    <div>
      <h2>📊 Progress Overview</h2>
      <p>✅ Completed: {completed.toFixed(2)}%</p>
      <p>⏳ Pending: {pending.toFixed(2)}%</p>
      <p>❌ Incomplete: {incomplete.toFixed(2)}%</p>
    </div>
  );
};

export default Progress;
