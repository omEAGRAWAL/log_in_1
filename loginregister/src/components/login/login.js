import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to manage errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post("http://localhost:9002/login", user);

      // Handle successful login response:
      setLoginUser(response.data.user);

      if (response.data.token) {
        // Store token securely:
        // (Consider using a more secure storage mechanism than localStorage)
        localStorage.setItem("authToken", response.data.token);
      }

      const fun = () => {};
      navigate("/");
      alert("Login Successfull");
      fun(); // Redirect to home page
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An error occurred while logging in"); // Set error message
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="login">
      <h1>hello Login</h1>
      <input
        type="text"
        placeholder="username"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <div className="button" onClick={login} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </div>
      {error && <div className="error">{error}</div>} // Display any errors
      <div>or</div>
      <div className="button" onClick={() => navigate("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
