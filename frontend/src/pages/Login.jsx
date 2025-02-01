import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { login, user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // ✅ Success message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, navigate);
      setMessage("Login successful!"); // ✅ Show success message
    } catch (error) {
      setMessage("Invalid email or password. Try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>} {/* ✅ Show login message */}
      {user && <h3>Hi, {user.email}!</h3>} {/* ✅ Show username */}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
