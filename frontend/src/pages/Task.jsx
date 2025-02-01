import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const Task = () => {
  const { tasks, fetchTasks } = useContext(TaskContext);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [incomplete, setIncomplete] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setCompleted(tasks.filter(task => task.status === "Completed").length);
    setPending(tasks.filter(task => task.status === "Pending").length);
    setIncomplete(tasks.filter(task => task.status === "Incomplete").length);
  }, [tasks]);

  return (
    <div>
      <h2>Task Summary</h2>
      <p>✅ Completed: {completed}</p>
      <p>⏳ Pending: {pending}</p>
      <p>❌ Incomplete: {incomplete}</p>
    </div>
  );
};

export default Task;
