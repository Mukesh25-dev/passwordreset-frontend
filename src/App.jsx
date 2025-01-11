import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

// Component to request password reset
const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://password-backend-1-qvpc.onrender.com/api/auth/request-password-reset",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div>
      <h2>Request Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

// Component to reset the password using the token
const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from the URL
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://password-backend-1-qvpc.onrender.com/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message); // Display success message
      navigate("/"); // Redirect to home after successful password reset
    } catch (error) {
      setMessage(
        error.response?.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

// Main App Component with Routing
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RequestPasswordReset />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  </Router>
);

export default App;
