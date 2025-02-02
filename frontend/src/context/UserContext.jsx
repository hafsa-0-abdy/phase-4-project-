import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [tasks, setTasks] = useState([]);  
  const [taskSummary, setTaskSummary] = useState({ completed: 0, pending: 0, incomplete: 0 });
  const [studyPlans, setStudyPlans] = useState([]);  // ✅ Added Study Plans

  const API_BASE_URL = "https://phase-4-project-7ot3.onrender.com";
  
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserProfile();
      fetchStudyPlans();  // ✅ Ensure Study Plans are fetched
    } else {
      setUser(null);
      setTasks([]);
      setStudyPlans([]);  // ✅ Clear study plans when logged out
      setTaskSummary({ completed: 0, pending: 0, incomplete: 0 });
    }
  }, [token]);

  // ✅ Login Function
  const login = async (email, password, navigate) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });

      const { access_token } = response.data;
      setToken(access_token);
      localStorage.setItem("token", access_token);

      await fetchUserProfile();
      navigate("/tasks"); // ✅ Redirect to Tasks page
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  };

  // ✅ Logout Function
  const logout = (navigate) => {
    setToken(null);
    setUser(null);
    setTasks([]);
    setStudyPlans([]);  // ✅ Clear Study Plans on Logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = null;
    navigate("/login"); // ✅ Redirect to login page
  };

  // ✅ Fetch User Profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      await fetchTasks();
      await fetchStudyPlans();  // ✅ Fetch Study Plans
    } catch (error) {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  // ✅ Fetch Tasks & Update Summary
  const fetchTasks = async () => {
    try {
      console.log("📌 Fetching tasks...");
      const response = await axios.get(`${API_BASE_URL}/api/tasks/`);
      setTasks(response.data.tasks);
      setTaskSummary(response.data.summary);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  // ✅ Fetch Study Plans
  const fetchStudyPlans = async () => {
    try {
      console.log("📌 Fetching study plans...");
      const response = await axios.get(`${API_BASE_URL}/api/study-plans`);
      setStudyPlans(response.data);
    } catch (error) {
      console.error("❌ Error fetching study plans:", error);
    }
  };

  // ✅ Add a New Task
  const addTask = async (taskData) => {
    try {
      console.log("📌 Adding Task:", taskData);
      const response = await axios.post(`${API_BASE_URL}/api/tasks/`, taskData);
      setTasks(response.data.tasks);
      setTaskSummary(response.data.summary);
      console.log("✅ Task added successfully");
    } catch (error) {
      console.error("❌ Error adding task:", error.response?.data || error.message);
    }
  };

  // ✅ Add a New Study Plan
  const addStudyPlan = async (studyPlanData) => {
    try {
      console.log("📌 Adding Study Plan:", studyPlanData);
      const response = await axios.post(`${API_BASE_URL}/api/study-plans/`, studyPlanData);
      setStudyPlans(response.data);
      console.log("✅ Study Plan added successfully");
    } catch (error) {
      console.error("❌ Error adding study plan:", error.response?.data || error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, token, tasks, taskSummary, studyPlans, login, logout, fetchTasks, fetchStudyPlans, addTask, addStudyPlan }}>
      {children}
    </UserContext.Provider>
  );
};
