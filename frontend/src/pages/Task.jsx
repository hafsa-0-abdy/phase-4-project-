import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";


const TaskPage = () => {
  const { tasks, addTask, updateTask, deleteTask, taskSummary } = useContext(UserContext);
  const [taskData, setTaskData] = useState({ title: "", description: "", due_date: "", priority: "Medium" });
  const [editingTask, setEditingTask] = useState(null);

  // ✅ Handle input change for adding/updating task
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTask) {
      await updateTask(editingTask.id, taskData); // ✅ Update existing task
    } else {
      await addTask({ ...taskData, status: "Pending" }); // ✅ Add new task
    }
    setTaskData({ title: "", description: "", due_date: "", priority: "Medium" });
    setEditingTask(null);
  };

  // ✅ Handle task edit
  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskData({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      priority: task.priority,
    });
  };

  // ✅ Handle task deletion
  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
    }
  };

  return (
    <div className="task-container">
      <h2>📌 Task Summary</h2>
      <div className="task-summary">
        <p>✅ Completed: {taskSummary.completed}</p>
        <p>⏳ Pending: {taskSummary.pending}</p>
        <p>❌ Incomplete: {taskSummary.incomplete}</p>
      </div>

      <h2>📝 {editingTask ? "Edit Task" : "Add a Task"}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input type="text" name="title" placeholder="Title" value={taskData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={taskData.description} onChange={handleChange}></textarea>
        <input type="date" name="due_date" value={taskData.due_date} onChange={handleChange} required />
        <select name="priority" value={taskData.priority} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
      </form>

      <h2>📌 Your Tasks</h2>
      <div className="task-grid">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-box">
              <div className="task-details">
                <h3>{task.title}</h3>
                <p><strong>📅 Due Date:</strong> {task.due_date}</p>
                <p><strong>⚡ Priority:</strong> {task.priority}</p>
                <p><strong>📌 Status:</strong> {task.status}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEdit(task)} className="edit-btn">✏ Edit</button>
                <button onClick={() => handleDelete(task.id)} className="delete-btn">🗑 Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskPage;
