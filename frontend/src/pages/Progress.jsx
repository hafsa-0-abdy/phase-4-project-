import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const Progress = () => {
  const { tasks, fetchTasks } = useContext(TaskContext);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [incomplete, setIncomplete] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const totalTasks = tasks.length;
    setCompleted(((tasks.filter(task => task.status === "Completed").length) / totalTasks) * 100);
    setPending(((tasks.filter(task => task.status === "Pending").length) / totalTasks) * 100);
    setIncomplete(((tasks.filter(task => task.status === "Incomplete").length) / totalTasks) * 100);
  }, [tasks]);

  return (
    <div>
      <h2>Progress Overview</h2>
      <p>✅ Completed: {completed.toFixed(2)}%</p>
      <p>⏳ Pending: {pending.toFixed(2)}%</p>
      <p>❌ Incomplete: {incomplete.toFixed(2)}%</p>
    </div>
  );
};

export default Progress;
