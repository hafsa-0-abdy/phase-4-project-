import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const TaskPage = () => {
  const { tasks, addTask, taskSummary } = useContext(UserContext);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Medium",
  });

  // ✅ Handle Task Input Changes
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Task
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask({ ...taskData, status: "Pending" });
    setTaskData({ title: "", description: "", due_date: "", priority: "Medium" });
  };

  return (
    <div>
      <h2>📋 Task Summary</h2>
      <p>✅ Completed: {taskSummary.completed}</p>
      <p>⏳ Pending: {taskSummary.pending}</p>
      <p>❌ Incomplete: {taskSummary.incomplete}</p>

      <h2>📝 Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={taskData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={taskData.description} onChange={handleChange}></textarea>
        <input type="date" name="due_date" value={taskData.due_date} onChange={handleChange} required />
        <select name="priority" value={taskData.priority} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <h2>📌 Your Tasks</h2>
      {tasks.length === 0 ? <p>No tasks available.</p> : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.due_date} - {task.priority} - {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskPage;
