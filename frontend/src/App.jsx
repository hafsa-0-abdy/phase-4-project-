import { Routes, Route } from "react-router-dom";  
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";
import Progress from "./pages/Progress";
import StudyPlans from "./pages/StudyPlans";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/study-plans" element={<StudyPlans />} />
        
      </Routes>
    </>
  );
};

export default App;
