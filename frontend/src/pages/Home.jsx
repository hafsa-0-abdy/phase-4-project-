import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center">
      <h1>📚 Student Productivity App</h1>
      <p>
        Welcome to the Student Productivity App, designed to help students manage their tasks, track progress, 
        and stay organized. With features like task management, study plans, and progress tracking, 
        this app ensures you stay on top of your academic responsibilities.
      </p>
      
      <h3>🚀 Get Started</h3>
      <p>Sign up and start managing your academic life efficiently!</p>

      <div className="btn-group">
        <Link to="/tasks" className="btn btn-primary">View Tasks</Link>
        <Link to="/login" className="btn btn-secondary">Login</Link>
      </div>
    </div>
  );
};

export default Home;
