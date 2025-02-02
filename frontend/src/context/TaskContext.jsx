import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";  

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token, user } = useContext(UserContext);  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://phase-4-project-7ot3.onrender.com/api/tasks";

 
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchTasks();
    }
  }, [token, user]);


  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks...");
      const response = await axios.get(API_BASE_URL);

      if (response.data.tasks) {
        setTasks(response.data.tasks);  
      } else {
        setTasks([]);  
      }
    } catch (error) {
      console.error(" Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add a new task
  const addTask = async (taskData) => {
    try {
      console.log("Adding Task:", taskData);
      const response = await axios.post(API_BASE_URL, taskData);
     
      if (response.data.tasks) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ✅ Update an existing task
  const updateTask = async (taskId, updatedTaskData) => {
    try {
      console.log(`Updating Task ID: ${taskId}`, updatedTaskData);
      const response = await axios.put(`${API_BASE_URL}/${taskId}`, updatedTaskData);

      if (response.data.tasks) {
        setTasks(response.data.tasks);  
      }
    } catch (error) {
      console.error(" Error updating task:", error);
    }
  };

  // ✅ Delete a task
  const deleteTask = async (taskId) => {
    try {
      console.log(`Deleting Task ID: ${taskId}`);
      const response = await axios.delete(`${API_BASE_URL}/${taskId}`);

      if (response.data.tasks) {
        setTasks(response.data.tasks);  
      }
    } catch (error) {
      console.error(" Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
