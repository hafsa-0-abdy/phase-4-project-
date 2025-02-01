import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";  // ✅ Import UserContext to access user ID

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token, user } = useContext(UserContext);  // ✅ Get user info from UserContext
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://127.0.0.1:5000/api/tasks";

  // ✅ Fetch tasks when the component mounts or user changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchTasks();
    }
  }, [token, user]);

  // ✅ Fetch tasks for the logged-in user
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add a new task
  const addTask = async (taskData) => {
    try {
      const response = await axios.post(API_BASE_URL, taskData);
      setTasks([...tasks, response.data]);  // ✅ Update state with new task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ✅ Update an existing task
  const updateTask = async (taskId, updatedTaskData) => {
    try {
      await axios.put(`${API_BASE_URL}/${taskId}`, updatedTaskData);
      setTasks(tasks.map(task => (task.id === taskId ? { ...task, ...updatedTaskData } : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
